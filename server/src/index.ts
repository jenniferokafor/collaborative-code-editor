export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    const io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", function (socket) {
      console.log("a user connected");

      // emit to clients when room code is updated
      strapi.db.lifecycles.subscribe((event) => {
        if (event.action === "afterUpdate") {
          socket.emit(
            `${event?.result?.roomId}_code_updated`,
            event?.result?.code
          );
        }
      });

      // emit when user disconnects
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });

    strapi.io = io;
  },
};

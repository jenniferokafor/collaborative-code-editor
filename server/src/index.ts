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
    const axios = require("axios");
    let room = "";

    io.on("connection", function (socket) {
      // emit to clients when user joins room
      socket.on("join_room", (roomId) => {
        socket.join(roomId);
        room = roomId;
        console.log(`user joined room ${roomId}`);
      });

      // listen for code updates
      socket.on(`update_${room}_code`, async (dbId, payload) => {
        console.log(`code updated in room ${room}`);
        console.log(payload);

        //store to db
        await axios
          .put(`http://localhost:1337/api/rooms/${dbId}`, {
            data: { code: payload },
          })
          .then(() => {
            socket.to(room).emit("updated_code", payload);
          })
          .catch((e) => console.log("error", e.message));
      });

      // emit to clients when room code is updated
      // strapi.db.lifecycles.subscribe((event) => {
      //   if (event.action === "afterUpdate") {
      //     socket.emit(
      //       `${event?.result?.roomId}_code_updated`,
      //       event?.result?.code
      //     );
      //   }
      // });

      // emit to clients when user leaves room
      socket.on("leave_room", (roomId) => {
        socket.leave(roomId);
        console.log(`user left room ${roomId}`);
      });

      // emit when user disconnects
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });

    strapi.io = io;
  },
};

export default {
  afterUpdate(event) {
    console.log("updated", event);
    // emit to all clients in the room from index.ts
  },
};

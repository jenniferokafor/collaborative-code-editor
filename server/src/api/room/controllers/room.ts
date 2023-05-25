/**
 * room controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::room.room",
  ({ strapi }) => ({
    // Replacing id with roomId in findOne method
    async findOne(ctx) {
      const { id } = ctx.params;

      const entity = await strapi.db
        .query("api::room.room")
        .findOne({ where: { roomId: id } });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
  })
);

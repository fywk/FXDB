'use strict';

/**
 *  mount controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::mount.mount');

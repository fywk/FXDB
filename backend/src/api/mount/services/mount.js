'use strict';

/**
 * mount service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mount.mount');

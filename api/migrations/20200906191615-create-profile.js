'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('profiles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
                unique: true
            },
            alamat: {
                type: Sequelize.STRING
            },
            no_hp: {
                type: Sequelize.STRING,
                unique: true
            },
            provinsi: {
                type: Sequelize.STRING
            },
            kabupaten: {
                type: Sequelize.STRING
            },
            kode_pos: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('profiles');
    }
};

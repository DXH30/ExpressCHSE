'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('pembayarans', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userid: {
                type: Sequelize.INTEGER
            },
            keterangan: {
                type: Sequelize.TEXT
            },
            nominal: {
                type: Sequelize.BIGINT
            },
            nama_file: {
                type: Sequelize.STRING
            },
            alamat_lengkap: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('pembayarans');
    }
};

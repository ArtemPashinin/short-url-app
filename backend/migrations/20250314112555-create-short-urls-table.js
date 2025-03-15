import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface) => {
    await queryInterface.createTable('short_urls', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      originalUrl: {
        type: DataTypes.STRING(2083),
        allowNull: false,
      },
      alias: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
      shortUrl: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      clickCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('short_urls');
  },
};

import { DataTypes } from 'sequelize';

export default {
  up: async (queryInterface) => {
    await queryInterface.createTable('click_analytics', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      shortUrlId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'short_urls',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ipAddress: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      clickDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
    await queryInterface.dropTable('click_analytics');
  },
};

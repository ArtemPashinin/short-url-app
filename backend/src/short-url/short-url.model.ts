import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';

import { ClickAnalytics } from '../analytics/click-analytics.model';

// Модель ShortUrl
@Table({ tableName: 'short_urls', timestamps: true })
export class ShortUrl extends Model {
  @Column({
    type: DataType.STRING(2083),
    allowNull: false,
  })
  originalUrl: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: true,
  })
  alias?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  shortUrl: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  expiresAt?: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  clickCount: number;

  @HasMany(() => ClickAnalytics)
  clickAnalytics: ClickAnalytics[];
}

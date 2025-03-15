import {
  Column,
  Model,
  Table,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';

import { ShortUrl } from '../short-url/short-url.model';

@Table({ tableName: 'click_analytics', timestamps: true })
export class ClickAnalytics extends Model {
  @ForeignKey(() => ShortUrl)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  shortUrlId: number;

  @Column({
    type: DataType.STRING(15),
    allowNull: false,
  })
  ipAddress: string;
}

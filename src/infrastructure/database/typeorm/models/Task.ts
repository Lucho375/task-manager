import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { UserORMEntity } from './User.js'

@Entity()
export class TaskORMEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @ManyToOne(() => UserORMEntity, (user) => user.tasks)
  public user!: UserORMEntity

  @Column()
  public title!: string

  @Column()
  public description!: string

  @Column({ default: false })
  public completed!: boolean

  @CreateDateColumn()
  public createdAt!: Date

  @UpdateDateColumn()
  public updatedAt!: Date
}

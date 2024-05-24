import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { TaskORMEntity } from './Task.js'

@Entity()
export class UserORMEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @Column()
  public username!: string

  @Column({ unique: true })
  public email!: string

  @Column()
  public password!: string

  @OneToMany(() => TaskORMEntity, (task) => task.user)
  public tasks!: TaskORMEntity[]

  @CreateDateColumn()
  public createdAt!: Date

  @UpdateDateColumn()
  public updatedAt!: Date
}

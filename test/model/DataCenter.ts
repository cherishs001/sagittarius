import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity()
export class Test {
    @PrimaryColumn()
    name: string;

    @Column()
    age: number;
}

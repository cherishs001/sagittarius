import {Orm} from '../../lib';
const {Entity, Column, PrimaryColumn} = Orm;

@Entity()
export class Test {
    @PrimaryColumn()
    name: string;

    @Column()
    age: number;
}

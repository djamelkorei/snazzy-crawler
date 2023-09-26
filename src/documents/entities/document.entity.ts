import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'documents'})
export class Document {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    company: string;

    @Column()
    content: string;

}

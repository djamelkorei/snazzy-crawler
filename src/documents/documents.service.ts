import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Document} from "./entities/document.entity";

@Injectable()
export class DocumentsService {

  constructor(@InjectRepository(Document) private documentRepository: Repository<Document>) {}

  async create(createDocumentDto: CreateDocumentDto) : Promise<Document> {
    console.log('This action adds a new document');
    const document : Document = {...createDocumentDto, id : null, embedding: []}
    return this.documentRepository.create(document);
  }

  findAll() : Promise<Document[]> {
    console.log(`This action returns all documents`);
    return this.documentRepository.find();
  }

  findOne(id: number): Promise<Document | null> {
    console.log(`This action returns a #${id} document`);
    return this.documentRepository.findOneBy({id});

  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto) : Promise<Document> {
    console.log(`This action updates a #${id} document`);
    let document = await this.documentRepository.findOneBy({id});
    document = {...document, ...updateDocumentDto};
    return this.documentRepository.create(document);
  }

  async remove(id: number) {
    console.log(`This action removes a #${id} document`);
    await this.documentRepository.delete(id);
  }
}

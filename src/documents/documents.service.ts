import {Injectable} from '@nestjs/common';
import {CreateDocumentDto} from './dto/create-document.dto';
import {UpdateDocumentDto} from './dto/update-document.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from 'typeorm';
import {Document} from "./entities/document.entity";
import {embeddingText} from "../utils/search";

@Injectable()
export class DocumentsService {

  constructor(@InjectRepository(Document) private documentRepository: Repository<Document>,
              private dataSource: DataSource) {}

  async create(createDocumentDto: CreateDocumentDto) : Promise<Document> {
    console.log('This action adds a new document');
    const embedding = await embeddingText(createDocumentDto.content);
    return await this.dataSource.manager.query(`insert into 
        documents(company, content, embedding) 
        values ('${createDocumentDto.company}',
                '${createDocumentDto.content}',
                '[${embedding.toString()}]'
                )`);
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
    await this.documentRepository.update(id, document);
    return this.documentRepository.findOneBy({ id })
  }

  async remove(id: number) {
    console.log(`This action removes a #${id} document`);
    await this.documentRepository.delete(id);
  }

}

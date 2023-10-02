import {TagType} from './tagType';
import {FullnameOfUser} from './userType';

interface Auth {
  _id: string;
  username: string;
  fullname: FullnameOfUser;
  avatar: string;
}

export interface NewsType {
  _id?: string;
  title: string;
  category: string;
  tags: TagType[];
  author: Auth;
  content: string;
  viewCount: number;
  likeCount: Array<string>;
  createdAt?: Date;
  updatedAt?: Date;
}

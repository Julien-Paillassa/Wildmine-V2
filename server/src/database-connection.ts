import { createConnection } from 'typeorm';

import Issue from './models/Issue';
import User from './models/User';
import Project from './models/Project';
import File from './models/File';
import Session from './models/Session';
import Image from './models/Image';

export default async (url: string, logging = false) => {
	await createConnection({
		type: "postgres",
    	url,
		entities: [User, Project, Issue, File, Session, Image],
		synchronize: true,
    logging,
	});
}

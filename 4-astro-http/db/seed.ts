import { getCollection } from 'astro:content';
import { db, Clientes, Posts } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	await db.insert(Clientes).values([
		{id: 1, name: 'Martin', age: 22, 'isActive': true},
		{id: 2, name: 'Sofia', age: 30, 'isActive': false},
		{id: 3, name: 'Lucas', age: 28, 'isActive': true},
		{id: 4, name: 'Valentina', age: 25, 'isActive': false},
		{id: 5, name: 'Mateo', age: 35, 'isActive': false},
	])


	const posts = await getCollection('blog');
	
	await db.insert(Posts).values(
		posts.map(post => ({
			id: post.id,
			title: post.data.title,
			likes: Math.round(Math.random() * 100)
		}))
	)

	console.log("Ejecución de Seed");
	
}

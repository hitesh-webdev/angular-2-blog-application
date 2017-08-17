import { Post } from '../post/post';
import { Comment } from '../post/comment';

export class PostService {

    postsList: Post[] = [
        new Post(1, 'Angular 2',
            'Google Developers',
            1502901017000,
            'https://udemy-images.udemy.com/course/750x422/500628_a962.jpg',
            'Angular JS is an open source framework built over JavaScript. It was built by the developers at Google. This framework was used to overcome obstacles encountered while working with Single Page applications.',
            ['mean', 'angular'],
            [new Comment('hitesh@gmail.com',
                        'nice concept',
                        1502902017000
                    ),
            new Comment('admin@gmail.com',
                        'very nice post',
                        1502903017000
                    ),
            ]
        ),
        new Post(2, 'Angular 4',
            'Google Developers',
            1502906737000,
            'https://blog.heliossolutions.in/wp-content/uploads/2017/04/A-New-Improved-Angular-is-Finally-Here-Angular-4.jpg',
            'Roughly six month after the release of Angular 2, the next big update for Angular is now available: Angular 4, or rather Angular v4, because the team decided it should be called “just Angular” from now on, without stating the version number explicitly in the name. Originally, the “2” was used to differentiate between AngularJS and the all new Angular Framework, which came with many reassessed and refined concepts. The result, Angular, can be used in many different programming Languages like Dart, TypeScript or ECMAScript 5 among others.',
            ['mean', 'angular'],
            [new Comment('admin@gmail.com',
                        'nice concept',
                        1502907737000
                    ),
            new Comment('hitesh@gmail.com',
                        'very nice post',
                        1502908737000
                    ),
            ]
        ),
        new Post(3, 'NodeJS',
            'Ryan Dhal',
            1502911017000,
            'https://www.visualstudio.com/wp-content/uploads/2016/06/Nodejs-2-562x309@2x-op.png',
            'Node.js® is a JavaScript runtime built on Chrome\'s V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js package ecosystem, npm, is the largest ecosystem of open source libraries in the world.',
            ['mean', 'node'],
            [new Comment('hitesh@gmail.com',
                        'nice concept',
                        1502912017000
                    ),
            new Comment('admin@gmail.com',
                        'very nice post',
                        1502913017000
                    ),
            ]
        ),
        new Post(4, 'MongoDB',
            'MongoDB Inc.',
            1502921017000,
            'https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2017/01/Untitled-design-796x404.png',
            'MongoDB (from humongous) is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemas. MongoDB is developed by MongoDB Inc. and is free and open-source, published under a combination of the GNU Affero General Public License and the Apache License.',
            ['mean', 'mongodb'],
            [new Comment('hitesh@gmail.com',
                        'nice concept',
                        1502922017000
                    ),
            new Comment('admin@gmail.com',
                        'very nice post',
                        1502923017000
                    ),
            ]
        ),
        new Post(5, 'Express',
            'TJ Holowaychuk',
            1502931017000,
            'http://codecondo.com/wp-content/uploads/2015/07/15-Websites-built-with-Express_785.png?x94435',
            'Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. Express is the backend part of the MEAN stack, together with MongoDB database and AngularJS frontend framework.',
            ['mean', 'node', 'express'],
            [new Comment('hitesh@gmail.com',
                        'nice concept',
                        1502932017000
                    ),
            new Comment('admin@gmail.com',
                        'very nice post',
                        1502933017000
                    ),
            ]
        )
    ];

}

import { Post } from '../post/post';
import { Comment } from '../post/comment';

export class PostService {

    postsList: Post[] = [
        new Post(1, 'Angular 2',
            'Google Developers',
            new Date().getTime(),
            'https://udemy-images.udemy.com/course/750x422/500628_a962.jpg',
            'Angular JS is an open source framework built over JavaScript. It was built by the developers at Google. This framework was used to overcome obstacles encountered while working with Single Page applications.',
            ['mean', 'angular'],
            [new Comment('hitesh@gmail.com',
                        'nice concept',
                        new Date().getTime()
                    ),
            new Comment('admin@gmail.com',
                        'very nice post',
                        new Date().getTime()
                    ),
            ]
        ),
        new Post(2, 'Angular 4',
            'Google Developers',
            new Date().getTime(),
            'https://blog.heliossolutions.in/wp-content/uploads/2017/04/A-New-Improved-Angular-is-Finally-Here-Angular-4.jpg',
            'Roughly six month after the release of Angular 2, the next big update for Angular is now available: Angular 4, or rather Angular v4, because the team decided it should be called “just Angular” from now on, without stating the version number explicitly in the name. Originally, the “2” was used to differentiate between AngularJS and the all new Angular Framework, which came with many reassessed and refined concepts. The result, Angular, can be used in many different programming Languages like Dart, TypeScript or ECMAScript 5 among others.',
            ['mean', 'angular'],
            [new Comment('admin@gmail.com',
                        'nice concept',
                        new Date().getTime()
                    ),
            new Comment('hitesh@gmail.com',
                        'very nice post',
                        new Date().getTime()
                    ),
            ]
        )
    ];

}

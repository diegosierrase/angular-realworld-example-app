import { http, HttpResponse } from 'msw';

const MOCKED_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWUxNjBlODg2NDYwY2NmM2Y3ZDZjNyIsInVzZXJuYW1lIjoiZGlhbmEuZWdoYWxzQGdtYWlsLmNvbSIsImV4cCI6MTcyODg1Njg5NSwiaWF0IjoxNzIzNjc3NDk1fQ.M9sWz_94H_M0z_94H_M0z_94H_M0z_94H_M0z_94H_M0z_94H_M0z';

export const handlers = [

    http.post('http://localhost:4200/api/users', async ({ request }) => {
        const body = await request.json();
        const { user } = body as any;

        if (!user.email || !user.password || !user.username) {
            return HttpResponse.json(
                {
                    errors: {
                        body: ['email, password, and username are required'],
                    },
                },
                { status: 422 }
            );
        }

        return HttpResponse.json(
            {
                user: {
                    email: user.email,
                    username: user.username,
                    token: MOCKED_JWT,
                    bio: null,
                    image: null,
                },
            },
            { status: 200 }
        );
    }),

    http.post('http://localhost:4200/api/users/login', async ({ request }) => {
        const body = await request.json();
        const { user } = body as any;

        if (user.email === 'test@example.com' && user.password === 'Pruebas2020!') {
            return HttpResponse.json(
                {
                    user: {
                        email: user.email,
                        username: 'testuser',
                        token: MOCKED_JWT,
                        bio: null,
                        image: null,
                    },
                },
                { status: 200 }
            );
        }

        return HttpResponse.json(
            {
                errors: {
                    'email or password': ['is invalid'],
                },
            },
            { status: 403 }
        );
    }),


    http.get('http://localhost:4200/api/articles', ({ request }) => {
        const url = new URL(request.url);
        const limit = url.searchParams.get('limit') || '10';
        const offset = url.searchParams.get('offset') || '0';

        console.log(`Intercepted articles request: limit=${limit}, offset=${offset}`);

        const articles = [
            {
                slug: 'how-to-train-your-dragon',
                title: 'How to train your dragon',
                description: 'Ever wonder how?',
                body: 'You have to believe',
                tagList: ['dragons', 'training'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                favorited: false,
                favoritesCount: 0,
                author: {
                    username: 'John Doe',
                    bio: 'Front-end Developer',
                    image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=JohnDoe',
                    following: false,
                },
            },
            {
                slug: 'how-to-train-your-dragon-2',
                title: 'How to train your dragon 2',
                description: 'So much better than the first!',
                body: 'You won\'t believe what happened next...',
                tagList: ['dragons', 'sequel'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                favorited: false,
                favoritesCount: 5,
                author: {
                    username: 'Jane Doe',
                    bio: 'Back-end Engineer',
                    image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=JaneDoe',
                    following: true,
                },
            },
        ];



        const startIndex = parseInt(offset, 10);
        const endIndex = startIndex + parseInt(limit, 10);
        const slicedArticles = articles.slice(startIndex, endIndex);

        return HttpResponse.json(
            {
                articles: slicedArticles,
                articlesCount: articles.length,
            },
            { status: 200 }
        );
    }),

    http.get('http://localhost:4200/api/tags', () => {
        console.log('Intercepted tags request');
        return HttpResponse.json(
            {
                tags: ['Angular', 'React', 'Vue', 'Testing', 'Playwright', 'Automation', 'Mocks', 'MSW'],
            },
            { status: 200 }
        );
    }),

    http.get('http://localhost:4200/api/articles/feed', ({ request }) => {
        const url = new URL(request.url);
        const limit = url.searchParams.get('limit') || '10';
        const offset = url.searchParams.get('offset') || '0';

        console.log(`Intercepted user feed request: limit=${limit}, offset=${offset}`);

        const userFeedArticles = [
            {
                slug: 'my-first-mocked-article',
                title: 'My First Mocked Article',
                description: 'This article appears in your feed!',
                body: 'This is the content of my first mocked article. It\'s pretty cool, right?',
                tagList: ['msw', 'mocking', 'testing'],
                createdAt: new Date(Date.now() - 86400000).toISOString(),
                updatedAt: new Date().toISOString(),
                favorited: true,
                favoritesCount: 1,
                author: {
                    username: 'testuser',
                    bio: 'A passionate mocker of APIs.',
                    image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=mockuser',
                    following: false,
                },
            },
            {
                slug: 'another-feed-item',
                title: 'Another Feed Item',
                description: 'Look what I found in my feed!',
                body: 'Interesting content here.',
                tagList: ['feed', 'personalization'],
                createdAt: new Date(Date.now() - 172800000).toISOString(),
                updatedAt: new Date().toISOString(),
                favorited: false,
                favoritesCount: 3,
                author: {
                    username: 'Jane Doe',
                    bio: 'Back-end Engineer',
                    image: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=JaneDoe',
                    following: true,
                },
            },
        ];

        const startIndex = parseInt(offset, 10);
        const endIndex = startIndex + parseInt(limit, 10);
        const slicedArticles = userFeedArticles.slice(startIndex, endIndex);

        return HttpResponse.json(
            {
                articles: slicedArticles,
                articlesCount: userFeedArticles.length,
            },
            { status: 200 }
        );
    }),
];

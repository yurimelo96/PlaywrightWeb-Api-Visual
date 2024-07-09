const { test, expect } = require('@playwright/test');

const endpoint = 'https://graphqlzero.almansi.me/api';
const query = `
  query {
    user(id: 1) {
      posts {
        data {
          id
          title
        }
      }
    }
  }
`;

test('Deve buscar os posts do usuário corretamente e retornar status 200', async ({ request }) => {
    const response = await request.post(endpoint, {
        headers: {
            'content-type': 'application/json'
        },
        data: {
            query
        }
    });

    const responseBody = await response.json();

    console.log(responseBody);

    const expectedResponse = {
        data: {
            user: {
                posts: {
                    data: [
                        { id: '1', title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit' },
                        { id: '2', title: 'qui est esse' },
                        { id: '3', title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut' },
                        { id: '4', title: 'eum et est occaecati' },
                        { id: '5', title: 'nesciunt quas odio' },
                        { id: '6', title: 'dolorem eum magni eos aperiam quia' },
                        { id: '7', title: 'magnam facilis autem' },
                        { id: '8', title: 'dolorem dolore est ipsam' },
                        { id: '9', title: 'nesciunt iure omnis dolorem tempora et accusantium' },
                        { id: '10', title: 'optio molestias id quia eum' },
                    ]
                }
            }
        }
    };

    expect(response.status()).toBe(200);
    expect(responseBody.data.user.posts.data).toHaveLength(10);

    responseBody.data.user.posts.data.forEach((post, index) => {
        expect(post.id).toBe(expectedResponse.data.user.posts.data[index].id);
        expect(post.title).toBe(expectedResponse.data.user.posts.data[index].title);
    });
});
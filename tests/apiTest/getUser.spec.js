const { test, expect } = require('@playwright/test');

    const endpoint = 'https://graphqlzero.almansi.me/api';
    const query = `
      query {
        user(id: 1) {
          id
          username
          email
          address {
            geo {
              lat
              lng
            }
          }
        }
      }
    `;

    test('Deve buscar os dados do usuário corretamente', async ({ request }) => {
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
                    id: '1',
                    username: 'Bret',
                    email: 'Sincere@april.biz',
                    address: {
                        geo: {
                            lat: -37.3159,
                            lng: 81.1496
                        }
                    }
                }
            }
        };
        
        expect(response.status()).toBe(200);
        expect(responseBody).toEqual(expectedResponse);
    });
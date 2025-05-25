import request from 'supertest';
import server from '../../server.js'; // ajuste o caminho se necessário

describe('Testes das rotas principais', () => {
  it('GET /all deve retornar status 200', async () => {
    const res = await request(server).get('/all');
    expect(res.statusCode).toBe(200);
    // Adicione mais asserts conforme o retorno esperado
  });

  it('GET /image/:language deve retornar status 200 ou 404', async () => {
    const res = await request(server).get('/image/pt'); 
    expect([200, 404]).toContain(res.statusCode);
  });

  it('GET /type/:type deve retornar status 200', async () => {
    const res = await request(server).get('/type/Letter'); 
    expect(res.statusCode).toBe(200);
  });

  it('POST /language deve retornar status 200', async () => {
    const res = await request(server)
      .post('/language')
      .send({ language: 'pt' });
    expect(res.statusCode).toBe(200);
  });

  it('POST /people deve retornar status 200', async () => {
    const res = await request(server)
      .post('/people')
      .send({ people: 'Brasileiro' });
    expect(res.statusCode).toBe(200);
  });

  it('PUT /update deve retornar status 200', async () => {
    const body = {
      	id:"057be8ff-c4e7-4878-b26e-88a934eea925",
	      language: "português",
        type: "substantivo",
        people: "tupi",
        contexto: "novo contexto"
    }
    const res = await request(server)
      .put('/update')
      .send({ body });
    expect(res.statusCode).toBe(200);
  });


  it('DELETE /delete deve retornar status 200', async () => {
    const res = await request(server)
      .post('/delete')
      .send({ id: '057be8ff-c4e7-4878-b26e-88a934eea925' });
    expect(res.statusCode).toBe(200);
  });

  it('POST /create deve criar uma palavra e retornar status 201', async () => {
    const body = {
      language: 'pt',
      type: 'substantivo',
      people: 'brasileiro',
      contexto: 'exemplo'
    };
    const res = await request(server).post('/create').send(body);
    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('id');
  });

  
});

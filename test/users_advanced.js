import supertest from "supertest";
import { expect,assert } from "chai";

const request = supertest('https://gorest.co.in/public-api/');

const token = 'a690d1e4c29a2b8290e2994f21faf01c9aa979b4c50ab2fe751ea47b098ae48a';

const url = 'users?access-token=' + '${token}' + '&page=3&gender=female&status=active';



describe('Users_advanced', () => {
    let id;

    it('POST /users', () => {
        const data = {
            name: 'lilly1',
            email: 'lilly-' + (Math.floor(Math.random()* 9999)) + '@test.net',            
            gender: 'female',
            status: 'active',
            };
        return request
        .post('users')
        .set('Authorization','Bearer a690d1e4c29a2b8290e2994f21faf01c9aa979b4c50ab2fe751ea47b098ae48a')
        .send(data).then((res) => {
            expect(res.body.data).to.deep.include(data); 
            id=res.body.data.id;
            console.log(id);
                
        });
    });

    it('GET /users', (done) => {
        request.get('users?access-token=${token}').end((err, res) => {
            expect(res.body).to.not.be.empty;
            done();
        });
    });

    it('GET /user/:id', () => {
        return request.get('users/' + ${id} + '?access-token=${token}').then((res) => {
            expect( res.body.data.id).to.be.eq(id);       
        });
    });

    it('GET /user/:query parameter', () => {
        return request.get(url).then((res) => {
            res.body.data.forEach(data => {
                expect(data.gender).to.be.eq('female');
            })
        });
    });

    

    //719899
    //'Bearer a690d1e4c29a2b8290e2994f21faf01c9aa979b4c50ab2fe751ea47b098ae48a'
    xit('PUT /users', () => {
        const c_data={
            name: 'jeep'
        }
        return request
        .put('users/719899')
        .set('Authorization','Bearer a690d1e4c29a2b8290e2994f21faf01c9aa979b4c50ab2fe751ea47b098ae48a')
        .send(c_data).then((res) => {
     //       res.body.data.name='new', //to make test fail (if res.name changed)
            expect(res.body.data).to.deep.include(c_data);
        }); 
    })

    xit('DELETE /users' , () => {

        return request
        .delete('users/721296')
        .set('Authorization','Bearer a690d1e4c29a2b8290e2994f21faf01c9aa979b4c50ab2fe751ea47b098ae48a')
        .then((res) => {
            expect(res.body.data).to.be.eq(null)
        });
        
    })

})

/* 

PSEUDO CODE

Behaviours:
-> magnets - magnetic dipole moment m -> MagneticField(x,y);
-> eletro  - charge -> ElectricField (x,y);
-> gravit  - mass -> GravitacionalField(x,y)


static: dont move
dynamic: 
    move(other agents with same prop <- total field of those agents <- each field have a logic to add to the acl)

    move(ambient <- noise OR other ambient field),

-> tracers: trace (agents with same prop <- total field of those agents)

>> expected:
const particle = createParticle(static||Dinamic,
                                magneticDipole aor
                                eletricCharge aor
                                Mass aor
                                Tracer (only if dynamic),
                                none (if dynamic only responds to ambient global fields)
                                )

*/


/*BEHAVIOURS*/

const createMagnet = (
    //default params
    m = createVector(),
    body = this
    ) => ({
       
    kind: 'magnet',
    m,
    body,
    field: (x=0,y=0, z=0) => {
        let vecr = createVector(x - body.pos.x, y-body.pos.y, z-body.pos.z);
        //console.log(vecr);
        let versorr = createVector().copy(vecr).setMag(1);
        let r = vecr.mag();
        if(r > 3) {
            let B = createVector().copy(versorr);
            B.mult(3*( m.dot(versorr) ));
            B.sub(m);
            B.div(r*r*r);
            return B;
        }
    }

});

/*I think I have to use currying here to let the magnet behaviour 
access the particle's position, so I create the magnet behaviour 
only when attributing this behaviour to the particle's self.*/
const magnet = (m) =>  (body) => {
    return createMagnet(m, body);
}

/*THE PARTICLE FACTORY*/

const createParticle = function(

    pos = vec(x,y),
    movement = 'static',
    ...args

) {

    const self = {
        engine: 
        { 
            pos, 
            movement: arguments[1],
        }
    }

    for (const physics of args) {
        self[physics(self.engine).kind] = physics(self.engine);
    }

    return self;
};


const particle = createParticle(  vec(10,10), 'dynamic', magnet(vec(2,2)) );



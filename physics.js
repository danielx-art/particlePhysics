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

const magnet = (
    //default params
    m = createVector(),
    ) => {
       
    const self = {
        kind: 'magnet',
        m,
        field: function(x=0,y=0, z=0) {
            let vecr = createVector(x - this.pos.x, y-this.pos.y, z-this.pos.z);
            //console.log(vecr);
            let versorr = vecr.copy().setMag(1);
            let r = vecr.mag();
            if(r > 3) {
                let B = versorr.copy();
                B.mult(3*( m.dot(versorr) ));
                B.sub(m);
                B.div(r*r*r);
                return B;
            }
        }
    }

    return self;

};


const createParticle = function(

    pos = vec(x,y),
    movement = 'static',
    ...args

) {

    const self = {
        pos,
        movement: arguments[1],
    }

    for (const physics of args) {
        self[physics.kind] = physics;
    }

    return self;
};

const particle = createParticle(vec(10,10), 'dynamic', magnet(vec(2,2)));
//const particle = createParticle(vec(10,10), 'dynamic', dipole = function() { return magnet(vec(1,1));} );


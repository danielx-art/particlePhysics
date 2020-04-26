# particlePhysics

HELLO!

Im trying to make a simple particles with physics libary, my objective is to make it easily expandable by adding more possibilities to behaviour functions to created particles.
Overall, I want to design something like this:

       const particle = createParticle(inticial_position, movable_or_not, behaviours(intensities))

where:
1. initial_position should be a vector on an abstract space (only space for now on)
2. movable_or_not, actually called 'movement' on my code, should receive the parameters 'static' or 'dynamic', and if 'dynamic' the particle should receive a move function (that is able to change its position frame by frame physics style):

       move{
       velocity.add(aceleration);
       position.add(velocity)
       acceleration.reset()
       }

3. behaviours(intensities) should be an array of objects that represent behaviours with its respective instensities that the particle acts as an agent - represented by a field(location) function - or passively - represented by a force(others) function, let me exemplify:

       const behaviour = function(intensity){
         name: behaviour,

         field: function(location) { 
           /* returns the individual field this particle generate, 
              proportional to its behaviour intensity, in a specific location in space */ 
           },

         force: function(others) { 
            /* searches in those other particles the same behaviour type, 
            calculates the total field produced by those particles in 
            this particle position and use some logic, taking into account 
            this particle's behaviour intensity, to finally add something 
            to this particle acceleration - returns this change in acceleration */
         }
       }

In addition, I want to be able to have a special kind of particle, called a tracer, always a 'dynamic particle', that only receives other particles behaviours and trace field lines produced by those particles behaviours with some 'artistic' parameters.

If you like this or think its interesting, feel free to help or leave suggestions!
> Daniel X, you can find me at www.danielx.art.br or @danielx.art on Instagram









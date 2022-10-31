const colors=["#F06292","#BA68C8","#90CAF9","#00FF00"];
const hslMax = 261;

class ParticlesSystem{
    particles;
    nextSpawnTime;
    spawnTimer;

    constructor(initialParticlesCount,orgPos,minSpawnDelay,maxSpawnDelay,minAngle,maxAngle){
        this.initialParticlesCount=initialParticlesCount;
        this.orgPos=orgPos;
        this.minSpawnDelay=minSpawnDelay;
        this.maxSpawnDelay=maxSpawnDelay;
        this.minAngle=minAngle;
        this.maxAngle=maxAngle;
        this.particles=[];
        this.init();
    }

    init(){
        for(let i=0;i<this.initialParticlesCount;i++){
            this.spawnParticle();
        }
        this.nextSpawnTime=this.rndBetween(this.minSpawnDelay,this.maxSpawnDelay);
        this.spawnTimer=0;
    }

    draw(cc,dt){
        this.spawnTimer+=dt;
        if(this.spawnTimer>this.nextSpawnTime){
            this.spawnParticle();
            this.spawnTimer=0;
            this.nextSpawnTime=this.rndBetween(this.minSpawnDelay,this.maxSpawnDelay);
        }
        for(let i=this.particles.length-1;i>=0;i--){
            let particle=this.particles[i];
            particle.draw(cc,dt);
            if(particle.life<0){
                this.particles.splice(i,1);
            }
            console.log(particle.dir.x);
            if(particle.life<2*particle.orgLife/3){
                if(particle.pos.x>(3*can.width/5)&&particle.pos.x<4*can.width/5){ 
                    // if(particle.dir.y<=-1.2246467991473532e-16){
                        console.log(particle.dir.x);
                    let newAngle = this.rndBetween(particle.angle+(particle.hsl/261)*180,particle.angle-(particle.hsl/261)*180);
                    particle.dir = {x:Math.cos(newAngle*Math.PI/180)*-1,y:Math.sin(newAngle*Math.PI/180)*-1};
                    // }
                }
            }
        }
    }

    spawnParticle(){
        let particleLife=this.rndBetween(8,10);
        let particlePos={x:this.orgPos.x,y:this.orgPos.y};
        let particleAngle=this.rndBetween(this.minAngle,this.maxAngle);
        let particleColor=this.rndBetween(0,hslMax);
        let particleSize=this.rndBetween(5,10);
        let particleSpeed=this.rndBetween(6,6);
        let particle=new Particle(particleLife,particlePos,particleAngle,particleColor,particleSize,particleSpeed);
        this.particles.push(particle);
    }

    rndBetween(min,max){
        return Math.floor(Math.random()*(max-min)+min);
    }

}
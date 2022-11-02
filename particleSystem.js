const colors=["#F06292","#BA68C8","#90CAF9","#00FF00"];
const hslMax = 261;

class ParticlesSystem{
    particles;
    nextSpawnTime;
    spawnTimer;
    hitCount;

    constructor(initialParticlesCount,orgPos,minSpawnDelay,maxSpawnDelay,minAngle,maxAngle,receptor){
        this.initialParticlesCount=initialParticlesCount;
        this.orgPos=orgPos;
        this.minSpawnDelay=minSpawnDelay;
        this.maxSpawnDelay=maxSpawnDelay;
        this.minAngle=minAngle;
        this.maxAngle=maxAngle;
        this.particles=[];
        this.hitCount=[];
        this.receptor = receptor;
        this.init();
    }

    init(){
        for(let i=0;i<this.initialParticlesCount;i++){
            this.spawnParticle();
        }
        for(let i=0;i<262;i++){
            this.hitCount.push(0);
        }
        this.nextSpawnTime=this.rndBetween(this.minSpawnDelay,this.maxSpawnDelay);
        this.spawnTimer=0;
    }

    draw(cc,dt,y){
        this.spawnTimer+=dt;
        if(this.spawnTimer>this.nextSpawnTime){
            this.spawnParticle(y);
            this.spawnTimer=0;
            this.nextSpawnTime=this.rndBetween(this.minSpawnDelay,this.maxSpawnDelay);
        }
        for(let i=this.particles.length-1;i>=0;i--){
            let particle=this.particles[i];
            particle.draw(cc,dt);
            if(particle.pos.x<0||particle.pos.x>can.width||particle.pos.y>can.height||particle.pos.y<0){
                this.particles.splice(i,1);
            }
            //console.log(particle.dir.x);
            if(particle.life<2*particle.orgLife/3){
                if(particle.pos.x>(3*can.width/5)&&particle.pos.x<4*can.width/5){ 
                    // if(particle.dir.y<=-1.2246467991473532e-16){
                    let newAngle = this.rndBetween(particle.angle+(particle.hsl/261)*180,particle.angle-(particle.hsl/261)*180);
                    particle.dir = {x:Math.cos(newAngle*Math.PI/180)*-1,y:Math.sin(newAngle*Math.PI/180)*-1};
                    // }
                }
            }
            this.checkHit(particle,i);
        }
    }

    checkHit(particle,i){
        let dx = particle.pos.x - this.receptor.x;
        let dy = particle.pos.y - this.receptor.y;
        let dist = (dx**2+dy**2)**0.5;
        //console.log(dist);
        if(dist<particle.size+this.receptor.eyeSize){
            this.hitCount[particle.hsl]+=2;
            this.particles.splice(i,1);
            //console.log("HIT");
        }
    }

    spawnParticle(y){
        let particleLife=this.rndBetween(8,10);
        let particlePos={x:this.orgPos.x,y:this.orgPos.y};
        let particleAngle=this.rndBetween(this.minAngle+y,this.maxAngle+y);
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
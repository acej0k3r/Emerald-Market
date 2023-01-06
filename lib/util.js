import confetti from 'canvas-confetti';


export const runStarExplosion = () => {

    var defaults = {
        spread: 400,
        ticks: 70,
        gravity: 0.5,
        decay: 0.92,
        startVelocity: 20,
        shapes: ['star'],
        colors: [ '#5f3f11', '#86540e', 'FFCA6C', 'FDFFB8', '#1e992d', '#1e9974', '##769f60']
      };
      
      function shoot() {
        confetti({
          ...defaults,
          particleCount: 40,
          scalar: 0.75,
          shapes: ['star']
        });
      
        confetti({
          ...defaults,
          particleCount: 20,
          scalar: 0.35,
          shapes: ['circle']
        });
      }
      
      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
      setTimeout(shoot, 300);

}



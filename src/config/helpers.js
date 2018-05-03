
const helpers = {


  control: {

    waveStrength: (pressedKey, wavesOptions) => {
      switch (pressedKey) {

        case 'ArrowUp':
        if(wavesOptions.seperation > -10) wavesOptions.seperation = wavesOptions.seperation - 1;
        if(wavesOptions.waveWidth < 50) wavesOptions.waveWidth = wavesOptions.waveWidth + 5;
        if(wavesOptions.waveHeight < 50) wavesOptions.waveHeight = wavesOptions.waveHeight + 5;
        console.log("Increase Strength", wavesOptions);
          break;

        case 'ArrowDown':
        if(wavesOptions.seperation < -1) wavesOptions.seperation = wavesOptions.seperation + 1;
        if(wavesOptions.waveWidth > 5) wavesOptions.waveWidth = wavesOptions.waveWidth - 5;
        if(wavesOptions.waveHeight > 5) wavesOptions.waveHeight = wavesOptions.waveHeight - 5;
        console.log("Decrese Strength", wavesOptions);
          break;

        default:
          break;
      }
    }

  }
};

export default helpers;

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

interface InitFirefliesParams {
  qty?: number;
  fixedColor?: string;
  maxMouseDistance?: number;
  moveTowardsMouseMultiplier?: number;
}

export const initFireflies = ({
  qty = 50,
  fixedColor,
  maxMouseDistance = 250,
  moveTowardsMouseMultiplier = 1,
}: InitFirefliesParams): void => {
  const dotContainer = document.querySelector('.dot-container') as HTMLElement;
  const dots: HTMLElement[] = [];

  // Function to create a random number within a given range
  const getRandomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  // Function to create a random color
  const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to create a dot and append it to the container
  const createDot = (x: number, y: number, size: number, color: string): void => {
    const dot = document.createElement('div');
    const dotTrack = document.createElement('div');
    const dotWrapper = document.createElement('div');
    
    dotWrapper.appendChild(dotTrack);
    dotWrapper.style.top = `${y}px`;
    dotWrapper.style.left = `${x}px`;
    dotWrapper.className = 'dot-wrapper';
    dotWrapper.setAttribute("data-testid", 'dot-wrapper');
    
    dotTrack.style.width = `${size}px`;
    dotTrack.style.height = `${size}px`;
    dotTrack.className = 'dot-track';
    dotTrack.style.animationDuration = `${getRandomInt(1, 6)}s`;
    dotTrack.style.animationDirection = getRandomInt(0, 2) === 1 ? 'normal' : 'reverse';
    
    dotTrack.appendChild(dot);
    dot.className = 'dot';
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.backgroundColor = color;
    
    dotContainer.appendChild(dotWrapper);
    dots.push(dotWrapper);
  };

  // Create random dots on page load
  const init = (): void => {
    dotContainer.innerHTML = '';
    dots.length = 0;
    for (let i = 0; i < qty; i++) {
      const x = getRandomNumber(0, window.innerWidth);
      const y = getRandomNumber(0, window.innerHeight);
      const size = getRandomNumber(5, 18);
      const color = fixedColor || getRandomColor();
      createDot(x, y, size, color);
    }
  };

  // Function to update the position of all dots on mouse move
  const updateDotsPosition = (event: MouseEvent): void => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    dots.forEach((dotWrapper) => {
      const dotRect = dotWrapper.getBoundingClientRect();
      const centerX = dotRect.left + dotRect.width / 2;
      const centerY = dotRect.top + dotRect.height / 2;

      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (distance < maxMouseDistance) {
        const scale = (1 - distance / maxMouseDistance) * moveTowardsMouseMultiplier;
        dotWrapper.style.transform = `translate(${deltaX * scale}px, ${deltaY * scale}px)`;
      } else {
        dotWrapper.style.transform = 'translate(0, 0)';
      }
    });
  };

  // INIT ELEMENTS
  init();
  
  // Add mousemove event listener to move all dots on mouse enter
  document.removeEventListener('mousemove', updateDotsPosition);
  document.addEventListener('mousemove', updateDotsPosition);

  // Function to reset all dot positions when mouse leaves the window
  const resetDotPositions = (): void => {
    dots.forEach((dotWrapper) => {
      dotWrapper.style.transform = 'translate(0, 0)';
    });
  };

  // Add mouseout event listener to reset all dot positions
  window.removeEventListener('mouseout', resetDotPositions);
  window.addEventListener('mouseout', resetDotPositions);
};

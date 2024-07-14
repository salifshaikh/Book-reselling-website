document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.part');
    const spinButton = document.getElementById('spin-btn');
    const resultDisplay = document.getElementById('result');
    const wheel = document.querySelector('.wheel');

    let spinning = false;

    spinButton.addEventListener('click', () => {
        if (spinning) return;

        spinning = true;
        resultDisplay.textContent = '';

        const sectionCount = sections.length;
        const degreesPerSection = 360 / sectionCount;
        const spins = Math.floor(Math.random() * 10) + sectionCount * 5;
        const totalDegrees = spins * 360 + Math.floor(Math.random() * 360);

        wheel.style.transition = 'transform 4s ease-out';
        wheel.style.transform = `rotate(${totalDegrees}deg)`;

        setTimeout(() => {
            const finalRotation = totalDegrees % 360;
            const winnerIndex = Math.floor((finalRotation + degreesPerSection / 2) / degreesPerSection) % sectionCount;
            const winningOption = sections[winnerIndex].textContent;
            const prize = calculatePrize(winningOption);

            resultDisplay.textContent = `Congratulations! You got ${prize}.`;
            sections[winnerIndex].classList.add('winner');

            setTimeout(() => {
                sections[winnerIndex].classList.remove('winner');
                spinning = false;
            }, 2000);
        }, 4000);
    });

    function calculatePrize(option) {
        switch (option) {
            case '1':
                return '20% off';
            case '2':
                return '30% off';
            case '3':
                return '50% off';
            case '4':
                return 'Free shipping';
            case '5':
                return '1 month pass';
            case '6':
                return 'Rs. 200 in B-wallet';
            default:
                return 'No prize';
        }
    }
});

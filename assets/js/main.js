document.addEventListener('DOMContentLoaded', function () {
    gsap.set(".container", { visibility: "visible" });
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".container", {
        duration: 2.3,
        opacity: 0,
        y: 30,
        ease: "power4.out"
    });

    const button = document.querySelector('.github-button');

    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.1,
            rotation: 2,
            duration: 0.3,
            ease: "elastic.out(1, 0.3)",
            backgroundColor: "#ffe44d"
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
            backgroundColor: "#ffd700"
        });
    });

    gsap.to(".smooth-scroll", {
        scrollTrigger: {
            trigger: ".container",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5
        }
    });

    document.querySelectorAll('.project-description').forEach(card => {

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = -(x - centerX) / 10;

            // Animate the card
            gsap.to(card, {
                duration: 0.3,
                rotationX: rotateX,
                rotationY: rotateY,
                scale: 1.05,
                zIndex: 1,
                ease: "power2.out",
                transformPerspective: 1000,
                transformOrigin: "center center",
            });

            // Add lighting effect
            gsap.to(card, {
                '--x': `${x}px`,
                '--y': `${y}px`,
                duration: 0.5,
                ease: "power2.out"
            });

            // Show pseudo-element effects
            card.style.setProperty('--before-opacity', '1');
            card.style.setProperty('--after-opacity', '1');
        });

        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                ease: "power2.out",
                clearProps: "zIndex"
            });

            card.style.setProperty('--before-opacity', '0');
            card.style.setProperty('--after-opacity', '0');
        });

        gsap.to(card, {
            y: '-5px',
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    });

    function setupProjectSwitch() {
        const projectContainer = document.querySelector('.projects');
        const projectDescriptions = document.querySelectorAll('.project-description');
        if (projectDescriptions.length < 2) return;

        // Store original positions
        const positions = projectDescriptions.length;
        let currentIndex = 0;

        // Create the switching animation
        function switchPositions() {
            // Calculate the distance between elements for the animation
            const distance = projectDescriptions[1].offsetTop - projectDescriptions[0].offsetTop;

            projectDescriptions.forEach((elem, index) => {
                const isFirst = index === 0;

                gsap.to(elem, {
                    y: isFirst ? distance : -distance,
                    duration: 1.5,
                    ease: "power3.inOut",
                    onComplete: function () {
                        // Reset positions and swap content
                        gsap.set(projectDescriptions, { y: 0 });

                        // Update the HTML content without changing it
                        projectDescriptions.forEach((desc, i) => {
                            desc.style.pointerEvents = 'auto'; // Ensure clicks work after animation
                        });
                    }
                });
            });
        }

        // Set up the interval for switching
        setInterval(switchPositions, 10000);

        // Initial setup with improved positioning
        projectDescriptions.forEach((elem) => {
            gsap.set(elem, {
                position: 'relative',
                zIndex: 1,
                pointerEvents: 'auto'
            });
        });
    }

    setupProjectSwitch();

    const textTimeline = gsap.timeline();

    textTimeline
        .to(".highlight", {
            text: "Software Developer",
            duration: 1.9,
            ease: "power2.inOut",
            delay: 1.5
        })
        .to(".highlight", {
            text: "Problem Solver",
            duration: 1.9,
            ease: "power2.inOut",
            delay: 1.5
        })
        .to(".highlight", {
            text: "Digital Craftsman",
            duration: 1.9,
            ease: "power2.inOut",
            delay: 1.5
        });

    gsap.set(".container", { visibility: "visible" });

    const cursorCircle = document.createElement('div');
    cursorCircle.classList.add('cursor-circle');
    document.body.appendChild(cursorCircle);

    const description = document.querySelector('.description');

    description.addEventListener('mousedown', () => {
        cursorCircle.style.display = 'block';
    });

    document.addEventListener('mousemove', (e) => {
        cursorCircle.style.left = `${e.clientX}px`;
        cursorCircle.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mouseup', () => {
        cursorCircle.style.display = 'none';
    });
});
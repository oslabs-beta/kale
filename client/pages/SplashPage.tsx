import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface NavItem {
  label: string;
  href?: string;
}

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  linkedInUrl: string;
  email: string;
}

//team member pictures
const ismaelImageURL: string = './public/Assets/Ismael Headshot.jpg';
const soniaImageURL: string = './public/Assets/Sonia Headshot.jpg';
const jinImageURL: string = './public/Assets/Jin Headshot.jpg';
const jeffImageURL: string = './public/Assets/Jeff Headshot.jpg';

//team member linkedIn
const soniaLinkedInUrl: string = 'https://www.linkedin.com/in/soheunhan/';
const jinLinkedInUrl: string =
  'https://www.linkedin.com/in/jinseong-nam-8b6815212/';
const jeffLinkedInUrl: string =
  'https://www.linkedin.com/in/jeffrey-chao-9479142a/';
const ismaelLinkedInUrl: string =
  'https://www.linkedin.com/in/ismael-boussatta-2493b2126/';

//team member email
const soniaEmail: string = 'sonia.han@hey.com';
const jinEmail: string = 'jjjinnam@gmail.com';
const ismaelEmail: string = 'boussatta.ismael@gmail.com';
const jeffEmail: string = 'tbd';

const teamMembers: TeamMember[] = [
  {
    name: 'Sonia Han',
    role: 'Software Engineer',
    imageUrl: soniaImageURL,
    linkedInUrl: soniaLinkedInUrl,
    email: soniaEmail,
  },
  {
    name: 'Jeffrey Chao',
    role: 'Software Engineer',
    imageUrl: jeffImageURL,
    linkedInUrl: jeffLinkedInUrl,
    email: jeffEmail,
  },
  {
    name: 'Jinseong Nam',
    role: 'Software Engineer',
    imageUrl: jinImageURL,
    linkedInUrl: jinLinkedInUrl,
    email: jinEmail,
  },
  {
    name: 'Ismael Boussatta',
    role: 'Software Engineer',
    imageUrl: ismaelImageURL,
    linkedInUrl: ismaelLinkedInUrl,
    email: ismaelEmail,
  },
];

export default function SplashPage() {
  const whatIsK8sSectionRef = useRef<HTMLDivElement>(null);
  const handleScrollToSection = () => {
    whatIsK8sSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-10">
        <div className="container mx-auto flex items-center justify-between py-4">
          <a href="/" className="logo">
            <img
              className="ml-[-8]"
              src="./public/Assets/kale logo.png"
              alt="kale Logo"
              width="50"
              height="50"
            />
          </a>

          <Link
            to="/signup"
            id="sign-up-button-homepage"
            className="rounded-md bg-kalegreen-600 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-kalegreen-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kalegreen-600"
          >
            Sign up
          </Link>
        </div>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#3AD48F] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="h-screen mx-auto max-w-3xl py-28 sm:py-32 lg:py-20">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-200 sm:text-6xl m-8">
              Welcome to <p className="inline-block text-kalegreen-600">kale</p>
              , your new favorite Kubernetes autoscaling tool
            </h1>
            <p className="text-center text-zinc-400 flex flex-row justify-center mb-16">
              Deploying your Machine Learning models on Kubernetes just got
              easier
            </p>
            <button
              className="rounded-md bg-kalegreen-600 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-kalegreen-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kalegreen-600"
              onClick={() => handleScrollToSection()}
            >
              Learn more
            </button>
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#3AD48F] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <section
          className="text-white grid grid-cols-2 gap-8 min-h-screen items-center pt-16"
          ref={whatIsK8sSectionRef}
        >
          <div className="text-content p-6 rounded-lg shadow-md">
            <h2 className="text-center font-extrabold text-4xl font-extrabold dark:text-zinc-200 flex flex-row justify-center mb-6">
              {' '}
              What’s the problem <br /> with K8s?
            </h2>
            <h3 className="text-center text-3xl text-zinc-400 flex flex-row justify-center font-semibold">
              {' '}
              Horizontal Pod Autoscaler
            </h3>
            <p className="text-center text-zinc-400 flex flex-row justify-center mb-6">
              It's a feature in K8s that automatically scales the number of pods
              based on observed metrics. This helps ensure your application has
              the resources it needs to handle varying workloads without manual
              intervention.
            </p>
            <h3 className="text-center text-3xl text-zinc-400 flex flex-row justify-center font-semibold">
              {' '}
              CPU and Memory usage
            </h3>
            <p className="text-center text-zinc-400 flex flex-row justify-center mb-6">
              HPA primarily focuses on resource-based metrics like CPU and
              memory usage.
            </p>
            <h3 className="text-center text-3xl text-zinc-400 flex flex-row justify-center font-semibold">
              {' '}
              GPU for Machine Learning
            </h3>
            <p className="text-center text-zinc-400 flex flex-row justify-center">
              A critical aspect of ML training processes is the utilization of
              GPUs to facilitate the simultaneous execution of computationally
              intensive tasks. While Kubernetes offers robust out-of-the-box
              autoscaling functionality, it currently lacks native support for
              scaling based on GPU metrics.
            </p>
          </div>
          <div className="image-container">
            <img
              className="rounded-lg"
              src="./public/Assets/GPU image.jpg"
              alt="GPU Image"
            />
          </div>
        </section>

        <div className="">
          <section className="items-center pt-16">
            <div className="dark:text-zinc-200 text-content p-6 rounded-lg">
              <h2 className="text-center font-extrabold text-4xl flex flex-row justify-center mb-3">
                The Solution -{' '}
                <span className="text-kalegreen-600 ml-3">kale</span>
              </h2>
              <p className="text-center zinc-400 text-xl">
                A monitoring and autoscaling tool designed for machine learning
                workloads on Kubernetes to provide more intelligent scaling
                decisions.
              </p>
            </div>
          </section>

          <section className="text-white grid grid-cols-2 gap-8 items-center pt-16">
            <div className="text-content bg-zinc-900 p-6 rounded-lg shadow-md ml-3">
              <h2 className="text-center font-extrabold text-4xl font-extrabold dark:text-zinc-200 flex flex-row justify-center mb-6">
                {' '}
                Demo
              </h2>
              <p className="text-center text-zinc-400 flex flex-row justify-center mb-6">
                1. Sign up for kale. <br />
                2a. Enter the prometheus endpoint corresponding to your deployed
                cluster. <br />
                2b. Enter the name of the pod you would like to monitor.
                <br />
                3. Take a snapshot of your pod metrics. <br />
                4. View your saved snapshots in your 'History' tab. <br />
                5. Click on a saved snapshot to open up its metrics.
              </p>
            </div>
            <div className="image-container mr-3">
              <img
                className="rounded-lg"
                src="./public/Assets/GPU image.jpg"
                alt="GPU Image"
              />
            </div>
          </section>
        </div>

        <h2 className="text-4xl font-extrabold dark:text-white flex flex-row justify-center mb-7 pt-16">
          {' '}
          Meet The Team
        </h2>
        <div className="flex flex-row justify-center">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="dark:text-white team-member flex flex-col items-center mr-6"
            >
              <img
                src={member.imageUrl}
                alt={member.name}
                width="100"
                height="100"
                className="rounded-full w-24 h-24 object-cover"
              />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <div className="flex space-x-2 mt-2">
                <a
                  href={member.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferror"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="xl" />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faEnvelope} size="xl" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

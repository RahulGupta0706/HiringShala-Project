import React from "react";
import Footer from "../components/Footer/Footer";
import aboutUs from "../components/assets/about-us2.png";
import jobSearch from "../components/assets/jobSearch.png";
import team from "../components/assets/team-2.jpg";

const About = () => {

  return(
    <>
   <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 lg:-mb-8 xl:-mb-5 -mb-12">
      <img
        src={aboutUs}
        alt=""
        className="lg:mt-10 absolute inset-0 -z-10 h-full w-full  object-cover object-right  md:object-center "
      />
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-600 sm:text-6xl drop-shadow-lg shadow-gray-900/60">about us</h2>
          <p className="mt-6 text-xl leading-8 text-gray-800 drop-shadow-lg shadow-gray-700/60 lg:pb-[72px]">
          We aspire to be the largest pool of career opportunities that match your skill set.Get linked up with outstanding people here to create a better future.
          </p>
        </div>
      </div>
    </div>

      
<div className="z-10 flex flex-col lg:w-2/3 w-10/12 gap-3 p-2 mx-auto bg-white shadow-lg select-none sm:p-4 h-80 sm:h-32 rounded-2xl sm:flex-row mb-20 ">
    <div className="bg-gray-200 h-32 sm:h-full sm:w-32 rounded-xl ">
     <img src={team} alt="" className="object-cover w-full h-full rounded-xl" />
    </div>
    <div className="flex flex-col flex-1 gap-3 sm:p-2">
        <div className="flex flex-col flex-1 gap-3">
            <div className="w-full h-3">
            <svg className="h-24 mx-auto -mb-24 text-gray-200" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
          </svg> 
          <blockquote>
              <p className="text-md italic text-gray-700 ">
"Discover a new era of hiring at HiringShala. With referrals at our heart, we're rewriting the rules of recruitment. Join us to be part of a journey where careers are elevated, and connections create success."</p>
     <p className="-mt-4 pr-6 text-center text-lg font-semibold font-serif text-indigo-600">-The HiringShala Team</p>
          </blockquote>
            </div>
       
            </div>
        </div>
    </div>

    <div>
         <div className="lg:grid grid-cols-2">
          <div>
           <h1 className="m-2 ml-2 pl-16 text-[#6E4C3E] font-semibold drop-shadow-xl shadow-gray-700/60">HiringShala</h1>
           <h6 className="lg:m-2 pl-16 text-[#6c5b5b] italic pb-10">-Building a Better Network of Opportunities</h6>
           <p className="lg:m-2 m-4 lg:pl-16 text-xl text-gray-700  text-justify">Welcome to <span className="text-2xl font-semibold">HiringShala</span>, where connections meet careers and referrals lead the way. We're not just a hiring company; we're a community-driven platform that believes in the power of relationships to shape the future of work. Our unique approach to talent acquisition centers around the strength of referrals, creating a symbiotic ecosystem where professionals and opportunities unite.</p>
           <p className="lg:m-2 m-4 lg:pl-16 text-xl text-gray-700 pb-16 text-justify">Elevate your journey with us as we redefine recruitment – where possibilities are sparked by connections, careers are sculpted by collaboration, and success is built on shared trust. Join our transformative mission, and let's pave the path to a brighter professional tomorrow, together.</p>
          </div>
          <div>
            <img src={jobSearch} alt="" className="object-scale-down object-top w-full lg:-mb-[750px] -mb-28" />
            </div>
          </div>
      </div>

      <div className="container mx-auto px-5 py-2 lg:px-28 lg:pt-24 mb-20">
  <div className="-m-1 lg:flex lg:flex-wrap md:-m-5">
    <div className="lg:flex lg:w-1/2 lg:flex-wrap">
      <div className="w-full p-1  bg-gray-100 rounded-3xl drop-shadow shadow-lg">
      <h4  className="m-2 pl-16 text-[#6E4C3E] italic pt-5 pb-2">Our Mission:</h4>
           <p className="m-2 lg:px-16 md:px-16 sm:px-4 text-sm text-justify text-black">At <span className="text-lg font-semibold">HiringShala</span>, we're on a mission to transform the recruitment landscape. Our mission is twofold: to empower individuals to play an active role in shaping their network and to assist organizations in finding exceptional candidates who align with their values and culture. We strive to create a win-win scenario where both job seekers and employers flourish.</p>
      </div>
      <div className="w-full p-1 md:p-2 bg-gray-100 rounded-3xl drop-shadow shadow-lg ">
      <h4  className="m-2 pl-16 text-[#6E4C3E] italic pt-5 pb-2">Our Story:</h4>
           <p className="m-2 lg:px-16 md:px-16 sm:px-4 text-sm text-justify text-black pb-2">Founded on the belief that the best opportunities often arise through trusted connections, <span className="text-lg font-semibold">HiringShala</span> was born from a vision to revolutionize the way companies hire top-tier talent. Our journey began with the realization that referrals, backed by shared experiences and genuine endorsements, consistently lead to better placements and a more satisfied workforce. We set out to bridge the gap between talent and organizations, fostering a collaborative environment that benefits everyone involved.</p>
      </div>
    </div>
    <div className="lg:flex lg:w-1/2 lg:flex-wrap">
      <div className="w-full p-1 md:p-2 bg-gray-100  rounded-3xl drop-shadow shadow-lg ">
      <h4 className="m-2 pl-16 text-[#6E4C3E] italic pt-5 pb-2">Why Choose Us:</h4>
      <ol  className="m-2 lg:px-16 md:px-16 sm:px-4 text-sm text-justify text-black pb-2">
         <li className="pb-2"><span className="text-md font-semibold">Community-Centric Approach:</span> We understand that behind every referral is a unique story. Our platform encourages professionals to advocate for their peers, fostering a community of support and growth.</li>
         <li className="pb-2" ><span className="text-md font-semibold">Quality Over Quantity:</span> Unlike traditional hiring processes, we prioritize quality over quantity. Each referral is carefully considered, ensuring that both the candidate and the company are a seamless fit.</li>
         <li className="pb-2"><span className="text-md font-semibold">Streamlined Process:</span> Our user-friendly platform simplifies the referral and hiring process, making it efficient for both referrers and employers to connect and collaborate.</li>
         <li className="pb-2"><span className="text-md  font-semibold">Diversity and Inclusion:</span> We're committed to promoting diversity and inclusion in the workforce. Our approach enables us to tap into a broader pool of talent, helping companies build teams that reflect the world we live in.</li>
         <li className="pb-2"><span className="text-md  font-semibold">Personalized Experience: </span><span className="text-md font-semibold">HiringShala</span> isn't just a recruitment platform; it's a personalized experience tailored to the needs of each user. We prioritize building meaningful relationships over transactions.</li></ol>
      </div>
      <div className="w-full p-1 md:p-2 bg-gray-100 rounded-3xl drop-shadow shadow-lg">
      <h4  className="m-2 pl-16 text-[#6E4C3E] italic pt-2 pb-2">Our Promise:</h4>
       <p className="m-2 lg:px-16 md:px-16 sm:px-4 text-sm text-justify text-black pb-2">As you explore <span className="text-lg font-semibold">HiringShala</span>, you'll discover a passionate team dedicated to creating opportunities that drive success. Whether you're a job seeker looking for your next challenge or an organization seeking exceptional talent, we promise to be your partner on this exciting journey. Join us in shaping the future of work, one referral at a time.
        Thank you for being part of the HiringShala community.</p>
      </div>
    </div>
  </div>
</div>`


<div className="bg-white py-6 sm:py-32 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
       <h1 className="text-[#6E4C3E] text-center font-semibold ">Building a Better network of Opportunities</h1>
       <h6 className="text-gray-700 text-center pb-10">Building a Better Tomorrow</h6>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <div className="text-base leading-7 text-gray-600">Active Users</div>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                13000+
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <div className="text-base leading-7 text-gray-600">Opportunities</div>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                8.6K+
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <div className="text-base leading-7 text-gray-600">Referrers</div>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                800+
              </dd>
            </div>
        </div>
      </div>
    </div>`

    <div className="bg-white pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Our referrals are from  most innovative teams
        </h2>
         <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 "
            src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
            alt="Transistor"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
            alt="Reform"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
            alt="Tuple"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
            alt="SavvyCal"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
            alt="Statamic"
            width={158}
            height={48}
          />
        </div>
      </div>
    </div>

   <Footer/>
   </>
  );
    };

export default About;
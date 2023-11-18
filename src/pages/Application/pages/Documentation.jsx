import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export default function Documentation() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <h1 className="text-2xl mb-5 underline underline-offset-4 text-center mt-4">FREQUENTLY ASKED QUESTIONS :</h1>
      <div className="w-50 m-auto">
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)}>What is a diary manager?</AccordionHeader>
          <AccordionBody>
            A diary manager is a professional responsible for organizing and maintaining schedules, appointments, and calendars for individuals or teams. They ensure that time is effectively managed and appointments are scheduled efficiently.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            What are the primary responsibilities of a diary manager?
          </AccordionHeader>
          <AccordionBody>
            The primary responsibilities of a diary manager include:

            1.Scheduling appointments and meetings.
            2.Managing and updating calendars.
            3.Coordinating with various parties to arrange appointments.
            4.Prioritizing and rescheduling appointments as needed.
            5.Sending reminders and confirmations for appointments.
            6.Handling travel arrangements if necessary.
            7.Organizing and maintaining files and documents related to appointments.
            8.Ensuring confidentiality and security of sensitive information.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(3)}>
            What skills are essential for a diary manager?
          </AccordionHeader>
          <AccordionBody>
            Essential skills for a diary manager include:

            1.Strong organizational skills.
            2.Excellent time management abilities.
            3.Effective communication and interpersonal skills.
            4.Attention to detail.
            5.Proficiency in calendar and scheduling software.
            6.Discretion and respect for confidentiality.
            7.Problem-solving skills.
            8.Adaptability and flexibility.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(4)}>
            How can a diary manager prioritize appointments and tasks?
          </AccordionHeader>
          <AccordionBody>
            A diary manager can prioritize appointments and tasks by considering their importance, urgency, and the preferences of the individual or team they are assisting. They can use tools like priority lists, color-coding, or time-blocking to manage and prioritize effectively.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(5)}>
            What tools or software do diary managers typically use?
          </AccordionHeader>
          <AccordionBody>
            Diary managers often use software like Microsoft Outlook, Google Calendar, or specialized scheduling software. They may also use task management tools such as Trello or Asana for more complex scheduling and task management.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(6)}>
            How do diary managers handle last-minute changes or cancellations?
          </AccordionHeader>
          <AccordionBody>
            Diary managers should have a system in place to quickly adapt to last-minute changes or cancellations. This may involve contacting relevant parties, rescheduling appointments, and ensuring that the updated schedule is communicated to everyone involved.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 7} icon={<Icon id={7} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(7)}>
            How do diary managers maintain confidentiality and data security?
          </AccordionHeader>
          <AccordionBody>
            Diary managers maintain confidentiality and data security by implementing strict access controls, password protection, encryption, and secure storage of sensitive information. They should also follow relevant privacy regulations and company policies.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 8} icon={<Icon id={8} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(8)}>
            What is the difference between a diary manager and a personal assistant?
          </AccordionHeader>
          <AccordionBody>
            While both roles involve managing schedules, a diary manager primarily focuses on scheduling and calendar management. A personal assistant may have a broader range of responsibilities, including administrative tasks, travel arrangements, and more extensive support to the individual they assist.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 9} icon={<Icon id={9} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(9)}>
            How can I become a diary manager?
          </AccordionHeader>
          <AccordionBody>
            To become a diary manager, you should develop the necessary skills and gain experience in calendar management and scheduling. Formal education in business administration or a related field can be helpful. Networking and seeking internships or entry-level positions in administrative roles can also be a good start.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 10} icon={<Icon id={10} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(10)}>
            Can diary management be automated?
          </AccordionHeader>
          <AccordionBody>
            Yes, to some extent, diary management can be automated using scheduling software and tools like AI-powered virtual assistants. However, human oversight is often necessary to handle complex scheduling scenarios and ensure a personal touch in managing appointments and calendars.

            Remember that the specific duties of a diary manager may vary depending on the organization and individual they support. It's essential to adapt to the specific needs and preferences of the person or team you are assisting.
          </AccordionBody>
        </Accordion>
      </div>
    </>
  );
}
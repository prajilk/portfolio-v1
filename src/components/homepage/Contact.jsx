import { Icon } from "@iconify/react";
import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import Heading from "../ui/Heading";
import { toast } from "sonner";

function getISTTime() {
    // Get current time in UTC
    const currentTimeUTC = new Date();

    // Convert to IST (UTC+5:30)
    const ISTOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
    const currentTimeIST = new Date(currentTimeUTC.getTime() + ISTOffset);

    // Format the time
    let hours = currentTimeIST.getUTCHours();
    let minutes = currentTimeIST.getUTCMinutes();
    let seconds = currentTimeIST.getUTCSeconds();
    let meridiem = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 12 AM is represented as 12, not 0

    // Add leading zeros to minutes and seconds if needed
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Construct the time string
    const timeString = `${hours}:${minutes}:${seconds} ${meridiem}`;

    return timeString;
}

export default function Contact() {
    const [time, setTime] = useState();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const heading = useRef(null);
    const body = useRef(null);
    const contactSection = useRef(null);

    useEffect(() => {
        ScrollTrigger.create({
            trigger: contactSection.current,
            start: "180px bottom",

            // markers: true,
            animation: gsap
                .timeline()
                .to(
                    heading.current,
                    { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 },
                    0
                )
                .to(
                    body.current,
                    { opacity: 1, y: 0, ease: "power4.out", duration: 1.25 },
                    0.2
                ),

            toggleActions: "play none none none",
        });
        ScrollTrigger.refresh();
    }, [contactSection]);

    useEffect(() => {
        setInterval(() => {
            setTime(getISTTime());
        }, 1000);
    });

    async function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();

        if (name === "" || email === "" || message === "") {
            setLoading(false);
            return toast.error("Please fill all the fields");
        }

        try {
            await fetch(
                `https://api-formease.vercel.app/form?api_key=${
                    import.meta.env.VITE_FORM_API
                }&form_id=40e5c627678b`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name,
                        email,
                        message,
                    }),
                }
            );
            toast.success("Message sent successfully.");
            setName("");
            setEmail("");
            setMessage("");
        } catch {
            toast.error("Unable sent message!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section
            id="contact"
            className="my-[10%] overflow-hidden"
            aria-label="contact me"
        >
            <Heading title="Contact" />
            <div
                ref={contactSection}
                className="mt-10 flex flex-col gap-20 md:grid md:grid-cols-6 md:px-12"
            >
                <div className="col-span-4">
                    <h3
                        ref={heading}
                        className="max-w-lg translate-y-10 text-heading-3 font-semibold leading-tight opacity-0 2xl:max-w-3xl 2xl:text-7xl"
                    >
                        Have an awesome idea? Let&apos;s bring it to life.
                    </h3>
                    <p
                        ref={body}
                        className="mt-4 max-w-md translate-y-10 text-body-2 text-accent-100 opacity-0 2xl:max-w-2xl 2xl:text-4xl"
                    >
                        I am currently available for freelance work. I am
                        accepting new projects starting from{" "}
                        {new Intl.DateTimeFormat("en-US", {
                            month: "long",
                        }).format(new Date())}{" "}
                        {new Date().getFullYear()}.
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        autoComplete="off"
                        // eslint-disable-next-line react/no-unknown-property
                        className="mt-10 font-grotesk"
                        method="POST"
                    >
                        <input type="hidden" name="form-name" value="contact" />
                        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2">
                            <div className="relative z-0">
                                <input
                                    required
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 focus:outline-none focus:ring-0"
                                    placeholder=" "
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 text-secondary-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                                >
                                    Your name
                                </label>
                            </div>
                            <div className="relative z-0">
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 focus:outline-none focus:ring-0"
                                    placeholder=" "
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 text-secondary-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                                >
                                    Your email
                                </label>
                            </div>
                            <div className="relative z-0 sm:col-span-2">
                                <textarea
                                    required
                                    id="message"
                                    name="message"
                                    rows="5"
                                    className="peer block w-full appearance-none border-0 border-b border-accent-100 bg-transparent px-0 py-2.5 focus:outline-none focus:ring-0"
                                    placeholder=" "
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                                <label
                                    htmlFor="message"
                                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-3 text-secondary-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                                >
                                    Your message
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`button group mt-10 border duration-200 disabled:bg-accent-100 ${
                                !loading &&
                                "hover:border-accent-400 hover:bg-transparent"
                            }`}
                        >
                            <span className="relative">
                                <span
                                    className={`absolute bottom-2 h-1 w-0 bg-secondary-700 opacity-90 duration-300 ease-out ${
                                        !loading && "group-hover:w-full"
                                    }`}
                                ></span>
                                {loading ? (
                                    "Sending..."
                                ) : (
                                    <span className="group-hover:text-accent-400">
                                        Send message
                                    </span>
                                )}
                            </span>
                        </button>
                    </form>
                </div>
                <div className="col-span-2 grid grid-cols-1 gap-x-4 gap-y-8 text-accent-300 sm:grid-cols-2 sm:gap-y-0 md:grid-cols-1">
                    <div className="space-y-3 ">
                        <h4 className="text-body-1 font-semibold 2xl:text-4xl">
                            Contact Details
                        </h4>
                        <div className="flex flex-col space-y-3 text-body-2 2xl:text-3xl">
                            <a
                                href="mailto:prajilk20017@gmail.com"
                                className="group relative w-fit cursor-pointer"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span>prajilk20017@gmail.com</span>
                                <span className="absolute bottom-0 left-0 h-[0.12em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
                            </a>
                        </div>
                    </div>
                    <div className="space-y-3 ">
                        <h4 className="text-body-1 font-semibold 2xl:text-4xl">
                            My Digital Spaces
                        </h4>
                        <div className="space-y-3 text-body-2 2xl:text-3xl">
                            <a
                                href="https://github.com/prajilk"
                                className="group flex items-center space-x-2"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Icon icon="mdi:github" color="#666" />
                                <div className="relative">
                                    <span>Github</span>
                                    <span className="absolute bottom-0 left-0 h-[0.10em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
                                </div>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/prajilk/"
                                className="group group flex w-fit items-center space-x-2"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Icon icon="mdi:linkedin" color="#666" />
                                <div className="relative">
                                    <span>LinkedIn</span>
                                    <span className="absolute bottom-0 left-0 h-[0.12em] w-0 rounded-full bg-secondary-600 duration-300 ease-in-out group-hover:w-full"></span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="space-y-3 ">
                        <h4 className="text-body-1 font-semibold 2xl:text-4xl">
                            Location
                        </h4>
                        <div className="space-y-2 text-body-2 2xl:text-3xl">
                            <p>
                                Bangalore, India <br></br>
                                {time}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

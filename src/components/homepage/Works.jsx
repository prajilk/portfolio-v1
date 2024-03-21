import irctcRedesign from "/src/assets/images/irctc-desktop.png";
import gadgexhub from "/src/assets/images/gadgexhub-desktop.png";
import adminGadgexhub from "/src/assets/images/admin-gadgexhub.png";
import formease from "/src/assets/images/formease.png";
import layerClay from "/src/assets/images/layer-clay.png";
import Projects from "../ui/Projects";
import Heading from "../ui/Heading";

export default function Works({ forwardedRef }) {
    return (
        <section
            ref={forwardedRef}
            id="works"
            className="nav-change my-[10%] overflow-hidden"
        >
            <Heading title="Projects" />
            <div className="mt-10 grid grid-cols-1 gap-16 gap-y-10 md:grid-cols-12">
                {/* Project #1 */}
                <div className=" col-span-1 md:col-span-12">
                    <Projects
                        link="https://irctc-redesign.vercel.app"
                        img={irctcRedesign}
                        alt="IRCTC Redesign vietnam website mockup"
                        name="IRCTC Redesign website"
                        type="Web Design • Frontend Development"
                        year="2024"
                        tools="NextJS • TailwindCSS • TypeScript"
                    />
                </div>
                {/* Project #2 */}
                <div className="col-span-1 pt-0 md:col-span-7 md:pt-16">
                    <Projects
                        link="https://gadgexhub.vercel.app/"
                        img={gadgexhub}
                        alt="gadgexhub landing page mockup"
                        name="Gadgexhub landing page"
                        type="Fullstack Development"
                        year="2024"
                        tools="NextJS • TailwindCSS • TypeScript • PostgreSQL"
                    />
                </div>
                <div className="col-span-1 pt-0 md:col-span-5 md:pt-80">
                    <Projects
                        link="https://admin-gadgexhub.vercel.app"
                        img={adminGadgexhub}
                        alt="Admin dashboard for E-Commerce"
                        name="E-Commerce Admin dashboard"
                        type="Fullstack Development"
                        year="2024"
                        tools="NextJS • TailwindCSS • TS • PostgreSQL"
                    />
                </div>
                <div className="col-span-1 h-fit pt-0 md:col-span-8 md:pt-20">
                    <Projects
                        link="https://formease.vercel.app"
                        img={formease}
                        alt="Formease"
                        name="Formease - Form management service"
                        type="Fullstack Development"
                        year="2023"
                        tools="ReactJS • Material UI • JavaScript • NodeJS • MongoDB"
                    />
                </div>
                <div className="col-span-1 h-fit md:col-span-4">
                    <Projects
                        link="https://layer-clay-design.vercel.app/"
                        img={layerClay}
                        alt="Layer Clay Design"
                        name="Layer Clay Design"
                        type="Frontend Development"
                        year="2024"
                        tools="ReactJS • TailwindCSS"
                    />
                </div>
            </div>
        </section>
    );
}

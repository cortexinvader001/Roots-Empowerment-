import { motion } from "motion/react";
import { useState, useEffect } from "react";
import info from "./data/centre-info.json";
import { 
  Baby, 
  HeartPulse, 
  Users, 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  X,
  ChevronRight,
  Heart,
  HelpCircle,
  Sparkles,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AIChat } from "./AIChat";

const iconMap: Record<string, any> = {
  Baby,
  HeartPulse,
  Users,
  BookOpen
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Programs", href: "#programs" },
    { name: "Services", href: "#services" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b py-4" : "bg-transparent py-8"}`}>
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4 group">
          <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center border border-foreground/10 bg-white shadow-sm ring-4 ring-primary/5 transition-transform group-hover:scale-105">
            <img src={info.logo} alt={info.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <span className="font-heading text-2xl font-extrabold tracking-tight text-foreground hidden md:block leading-none">
            {info.name}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-bold text-foreground/60 hover:text-primary transition-colors">
              {link.name}
            </a>
          ))}
          <a href="#contact">
            <Button variant="secondary" size="sm" className="rounded-full px-8 font-bold btn-shadow">Visit Centre</Button>
          </a>
        </div>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-background border-b p-8 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-lg font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="w-full rounded-full btn-shadow" variant="secondary">Visit Centre</Button>
          </a>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-content text-center lg:text-left"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-8 tracking-tight text-foreground">
              Growth for <br />
              <span className="text-primary">every child.</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {info.about.mission}
            </p>
            
            <div className="flex flex-wrap gap-4 md:gap-6 mb-12 justify-center lg:justify-start">
              <div className="stat-card flex-1 min-w-[120px]">
                <span className="block text-2xl md:text-3xl font-extrabold text-primary mb-1">4:1</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 leading-tight">Child to Teacher</span>
              </div>
              <div className="stat-card flex-1 min-w-[120px]">
                <span className="block text-2xl md:text-3xl font-extrabold text-primary mb-1">100%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 leading-tight">Inclusive Play</span>
              </div>
              <div className="stat-card flex-1 min-w-[120px]">
                <span className="block text-2xl md:text-3xl font-extrabold text-primary mb-1">12+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 leading-tight">Specialized Labs</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact">
                <Button size="lg" className="rounded-full px-10 text-lg h-14 font-bold btn-shadow w-full sm:w-auto" variant="secondary">
                  Book a Tour
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6 relative">
              <div className="bg-primary rounded-[2rem] h-[220px] flex items-center justify-center overflow-hidden">
                <div className="text-white/50 text-6xl">✿</div>
              </div>
              <div className="bg-accent rounded-[2rem] h-[220px] mt-10 flex items-center justify-center relative overflow-hidden">
                <div className="text-white/50 text-6xl">☀</div>
                <div className="absolute -top-3 -right-3 bg-secondary text-white px-4 py-2 rounded-2xl text-xs font-extrabold rotate-12 shadow-lg">
                  Now Enrolling
                </div>
              </div>
              <div className="bg-muted rounded-[2rem] h-[160px] col-span-2 flex items-center justify-center overflow-hidden">
                <div className="text-primary/30 text-2xl font-bold">Inclusive Learning Environment</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" 
                alt="Inclusive learning" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 md:-bottom-10 -right-4 md:-right-10 bg-accent p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl max-w-[200px] md:max-w-xs rotate-3">
              <p className="font-heading text-lg md:text-2xl font-extrabold italic mb-2">"Every child is a different kind of flower."</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-12 lg:mt-0"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 md:mb-10 tracking-tight">Our Story & Vision</h2>
            <p className="text-lg md:text-xl text-foreground/70 mb-10 leading-relaxed">
              {info.about.story}
            </p>
            <div className="grid sm:grid-cols-2 gap-6 md:gap-10">
              <div className="bg-white p-8 rounded-3xl border-l-4 border-primary shadow-sm">
                <h3 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                  Our Mission
                </h3>
                <p className="text-sm text-foreground/60 font-medium leading-relaxed">{info.about.mission}</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border-l-4 border-secondary shadow-sm">
                <h3 className="text-xl font-extrabold mb-4 flex items-center gap-2">
                  Our Vision
                </h3>
                <p className="text-sm text-foreground/60 font-medium leading-relaxed">{info.about.vision}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 md:mb-8 tracking-tight">Specialized Support</h2>
          <p className="text-lg md:text-xl text-foreground/60 font-medium">
            We offer a comprehensive range of services designed to support the holistic development of every child.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {info.services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-[2rem] p-4 group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-primary mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Icon size={32} />
                    </div>
                    <CardTitle className="text-2xl font-extrabold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/60 font-medium leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Programs = () => {
  return (
    <section id="programs" className="py-16 md:py-24 bg-accent/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 md:mb-8 tracking-tight">Learning Programs</h2>
            <p className="text-lg md:text-xl text-foreground/60 font-medium leading-relaxed">
              Our programs are tailored to different developmental stages, ensuring that every child receives the right level of challenge and support.
            </p>
          </div>
          <Button variant="outline" className="rounded-full border-2 border-primary text-primary font-bold px-8 h-12 hover:bg-primary hover:text-white w-full md:w-auto">View All Programs <ChevronRight size={16} className="ml-2" /></Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {info.programs.map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-6 md:mb-8 shadow-xl border-4 border-white">
                <img 
                  src={program.image} 
                  alt={program.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl md:text-4xl font-extrabold mb-3 md:mb-4">{program.name}</h3>
              <p className="text-base md:text-lg text-foreground/60 font-medium leading-relaxed">{program.focus}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-primary text-white rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-24 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10">
            <Heart size={150} className="md:w-[250px] md:h-[250px]" fill="currentColor" />
          </div>
          
          <div className="relative z-10 max-w-4xl">
            <h2 className="text-4xl md:text-7xl font-extrabold mb-12 md:mb-16 leading-tight tracking-tight">
              Voices of our <br />
              <span className="text-accent italic">Roots Community</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              {info.testimonials.map((t, i) => (
                <div key={i} className="flex flex-col">
                  <p className="text-lg md:text-2xl font-bold italic mb-6 md:mb-8 leading-relaxed opacity-90">"{t.quote}"</p>
                  <div className="mt-auto flex items-center gap-4 md:gap-6">
                    <div className="w-8 md:w-12 h-[2px] bg-white/30" />
                    <span className="font-extrabold tracking-widest uppercase text-[10px] md:text-xs opacity-70">{t.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    info: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", info: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 md:mb-8 tracking-tight">Get in Touch</h2>
              <p className="text-lg md:text-xl text-foreground/60 leading-relaxed font-medium mb-10 md:mb-12">
                Have questions about our programs or want to schedule a visit? We'd love to hear from you and welcome you to our centre.
              </p>
              
              <div className="space-y-6 md:space-y-8 mb-10 md:mb-12">
                <div className="flex items-start gap-6 md:gap-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-muted rounded-2xl md:rounded-3xl flex items-center justify-center text-primary shrink-0 shadow-sm">
                    <Phone size={24} className="md:w-8 md:h-8" />
                  </div>
                  <div>
                    <h4 className="text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-foreground/30 mb-1 md:mb-2 leading-none">Call Us</h4>
                    <p className="text-lg md:text-2xl font-extrabold leading-tight">{info.contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 md:gap-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-muted rounded-2xl md:rounded-3xl flex items-center justify-center text-primary shrink-0 shadow-sm">
                    <Mail size={24} className="md:w-8 md:h-8" />
                  </div>
                  <div>
                    <h4 className="text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-foreground/30 mb-1 md:mb-2 leading-none">Email Us</h4>
                    <p className="text-lg md:text-2xl font-extrabold leading-tight break-all">{info.contact.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 md:gap-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-muted rounded-2xl md:rounded-3xl flex items-center justify-center text-primary shrink-0 shadow-sm">
                    <MapPin size={24} className="md:w-8 md:h-8" />
                  </div>
                  <div>
                    <h4 className="text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-foreground/30 mb-1 md:mb-2 leading-none">Visit Us</h4>
                    <p className="text-lg md:text-2xl font-extrabold leading-tight">{info.contact.address}</p>
                  </div>
                </div>
              </div>

              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=591+Notre+Dame+Ave,+Winnipeg,+MB+R3B+1S6,+Canada" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg btn-shadow w-full sm:w-fit justify-center"
              >
                Get Directions <ChevronRight size={20} />
              </a>
            </div>

            <div className="relative h-[300px] md:h-[400px] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden border-4 md:border-8 border-white shadow-xl">
              <iframe
                title="Roots Empowerment Location"
                aria-label="591 Notre Dame Ave, Winnipeg, MB R3B 1S6, Canada"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=591%20Notre%20Dame%20Ave%2C%20Winnipeg%2C%20MB%20R3B%201S6%2C%20Canada&t=m&z=15&output=embed&iwloc=near"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer"
              ></iframe>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] shadow-2xl border border-foreground/5 h-fit lg:sticky lg:top-24 mt-12 lg:mt-0">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-8 tracking-tight">Send a Message</h3>
            
            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border-2 border-green-100 p-8 rounded-3xl text-center"
              >
                <div className="w-16 h-16 bg-green-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
                  <Check size={32} />
                </div>
                <h4 className="text-2xl font-extrabold text-green-800 mb-2">Message Sent!</h4>
                <p className="text-green-700 font-medium">Thank you for reaching out. We'll get back to you shortly.</p>
                <Button 
                  onClick={() => setStatus("idle")} 
                  className="mt-8 rounded-xl px-12 h-12 bg-green-600 hover:bg-green-700 font-extrabold uppercase tracking-widest text-xs"
                >
                  Close
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/40">Parent Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-muted/50 border-none rounded-2xl p-5 focus:ring-2 focus:ring-primary outline-none font-bold" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/40">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-muted/50 border-none rounded-2xl p-5 focus:ring-2 focus:ring-primary outline-none font-bold" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/40">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-muted/50 border-none rounded-2xl p-5 focus:ring-2 focus:ring-primary outline-none font-bold" 
                    placeholder="+1 (555) 000-0000" 
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/40">Child's Age & Interests</label>
                  <input 
                    type="text" 
                    value={formData.info}
                    onChange={(e) => setFormData({...formData, info: e.target.value})}
                    className="w-full bg-muted/50 border-none rounded-2xl p-5 focus:ring-2 focus:ring-primary outline-none font-bold" 
                    placeholder="e.g. 5 years old, loves music" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/40">Message</label>
                  <textarea 
                    required
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-muted/50 border-none rounded-2xl p-5 focus:ring-2 focus:ring-primary outline-none resize-none font-bold" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                {status === "error" && (
                  <p className="text-red-500 font-bold text-sm bg-red-50 p-4 rounded-xl">
                    Something went wrong. Please try again or call us directly.
                  </p>
                )}

                <Button 
                  disabled={status === "loading"}
                  className="w-full h-16 rounded-2xl text-xl font-extrabold btn-shadow" 
                  variant="secondary"
                  type="submit"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white pt-16 md:pt-24 pb-12 border-t border-foreground/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Location</span>
            <span className="text-sm font-bold leading-relaxed">{info.contact.address}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Call Us</span>
            <span className="text-sm font-bold">{info.contact.phone}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Email</span>
            <span className="text-sm font-bold break-all">{info.contact.email}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Operating Hours</span>
            <span className="text-sm font-bold">{info.contact.hours}</span>
          </div>
        </div>
        
        <Separator className="mb-8 opacity-50" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left text-xs md:text-sm text-foreground/40 font-bold">
          <p>© {new Date().getFullYear()} {info.name}. All rights reserved.</p>
          <div className="flex gap-6 md:gap-8">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FAQ = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
              <HelpCircle size={32} />
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Common Questions</h2>
          </div>
          
          <Accordion className="w-full space-y-4">
            {info.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-2xl md:rounded-3xl px-6 md:px-8 border-none shadow-sm overflow-hidden">
                <AccordionTrigger className="text-xl md:text-2xl font-extrabold hover:text-primary transition-colors py-6 md:py-8 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/60 text-lg md:text-xl font-medium leading-relaxed pb-6 md:pb-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

const Values = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {info.about.values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 md:p-8 rounded-[2rem] hover:bg-muted/50 transition-colors duration-300"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6 md:mb-8">
                <Sparkles size={32} className="md:w-10 md:h-10" />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-3 md:mb-4">{value.title}</h3>
              <p className="text-sm md:text-base text-foreground/60 font-medium leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Values />
        <Services />
        <Programs />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
}
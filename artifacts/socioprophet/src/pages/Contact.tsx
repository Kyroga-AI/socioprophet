import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, Mail, Building, User } from "lucide-react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium uppercase tracking-wider mb-6">
              <Mail className="w-4 h-4" />
              <span>Contact Us</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Request a Briefing.</h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-md leading-relaxed">
              Speak with our engineering and deployment team about bringing sovereign, governed AI infrastructure into your environment. 
              Defined-scope engagements. No hidden complexity.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-card border border-border flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Confidential Consultation</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We routinely work under NDA to discuss specific regulatory and architectural requirements for Tier-1 institutions.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-card border border-border flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Enterprise Ready</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Cloud-agnostic deployments (AWS, Azure, GCP, IBM) or strictly air-gapped on-premise hardware setups.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-8 md:p-10 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
            
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 animate-in fade-in duration-500">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Request Received</h3>
                <p className="text-muted-foreground mb-8">
                  Our engineering team will review your requirements and reach out securely to schedule a briefing.
                </p>
                <Button variant="outline" className="rounded-none border-border" onClick={() => setSubmitted(false)}>
                  Send Another Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">First Name</label>
                    <Input required className="rounded-none bg-background border-border focus-visible:ring-primary h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">Last Name</label>
                    <Input required className="rounded-none bg-background border-border focus-visible:ring-primary h-12" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">Corporate Email</label>
                  <Input required type="email" className="rounded-none bg-background border-border focus-visible:ring-primary h-12" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">Organisation</label>
                  <Input required className="rounded-none bg-background border-border focus-visible:ring-primary h-12" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">Primary Interest / Use Case</label>
                  <Textarea required className="rounded-none bg-background border-border focus-visible:ring-primary min-h-[120px] resize-none" />
                </div>

                <Button type="submit" className="w-full rounded-none font-semibold uppercase tracking-wider h-14 text-sm mt-4">
                  Submit Request
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  By submitting this form, you agree to our privacy policy and secure handling of your data.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

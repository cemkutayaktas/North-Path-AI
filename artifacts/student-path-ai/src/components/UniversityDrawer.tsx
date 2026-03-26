import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { getUniversityInfo } from "@/lib/universityDetails";
import { getQSRank } from "@/lib/qsRankings";
import { Button } from "@/components/ui/button";
import {
  Medal, MapPin, Calendar, Users, ExternalLink,
  GraduationCap, BookOpen, CheckCircle2, Globe,
} from "lucide-react";

interface UniversityDrawerProps {
  universityName: string | null;
  onClose: () => void;
}

export function UniversityDrawer({ universityName, onClose }: UniversityDrawerProps) {
  const info = universityName ? getUniversityInfo(universityName) : null;
  const rank = universityName ? getQSRank(universityName) : null;

  return (
    <Sheet open={!!universityName} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        {universityName && (
          <>
            <SheetHeader className="pb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <SheetTitle className="text-left text-base font-bold leading-tight">{universityName}</SheetTitle>
                  {info && (
                    <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{info.city}, {info.country}</span>
                    </div>
                  )}
                </div>
                {rank && (
                  <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-xl border shrink-0 ${
                    rank <= 10  ? "bg-amber-50 text-amber-700 border-amber-200"
                    : rank <= 50  ? "bg-violet-50 text-violet-700 border-violet-200"
                    : rank <= 100 ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-slate-50 text-slate-600 border-slate-200"
                  }`}>
                    <Medal className="w-3.5 h-3.5" />
                    QS #{rank}
                  </div>
                )}
              </div>
            </SheetHeader>

            {info ? (
              <div className="space-y-5 mt-2">
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">{info.description}</p>

                {/* Key stats */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Calendar,     label: "Founded",    value: info.founded.toString() },
                    { icon: Users,        label: "Students",   value: info.totalStudents ?? "—" },
                    { icon: BookOpen,     label: "Type",       value: info.type },
                    { icon: CheckCircle2, label: "Acceptance", value: info.acceptanceRate ?? "—" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="rounded-xl border bg-muted/30 p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">{label}</span>
                      </div>
                      <span className="text-sm font-semibold">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Tuition */}
                <div className="rounded-xl border p-4 space-y-2">
                  <h4 className="text-sm font-semibold">💰 Tuition Fees</h4>
                  <div className="space-y-1.5 text-sm">
                    {info.tuitionEU       && <div className="flex justify-between gap-4"><span className="text-muted-foreground">EU/EEA students</span><span className="font-medium text-right">{info.tuitionEU}</span></div>}
                    {info.tuitionNonEU    && <div className="flex justify-between gap-4"><span className="text-muted-foreground">Non-EU students</span><span className="font-medium text-right">{info.tuitionNonEU}</span></div>}
                    {info.tuitionDomestic && <div className="flex justify-between gap-4"><span className="text-muted-foreground">Domestic</span><span className="font-medium text-right">{info.tuitionDomestic}</span></div>}
                    {info.tuitionIntl     && <div className="flex justify-between gap-4"><span className="text-muted-foreground">International</span><span className="font-medium text-right">{info.tuitionIntl}</span></div>}
                  </div>
                </div>

                {/* Language requirements */}
                {(info.ielts || info.toefl) && (
                  <div className="rounded-xl border p-4 space-y-2">
                    <h4 className="text-sm font-semibold">🌐 English Requirements</h4>
                    <div className="space-y-1.5 text-sm">
                      {info.ielts && <div className="flex justify-between gap-4"><span className="text-muted-foreground">IELTS</span><span className="font-medium">{info.ielts}</span></div>}
                      {info.toefl && <div className="flex justify-between gap-4"><span className="text-muted-foreground">TOEFL</span><span className="font-medium">{info.toefl}</span></div>}
                    </div>
                  </div>
                )}

                {/* Strengths */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">⭐ Known For</h4>
                  <div className="flex flex-wrap gap-2">
                    {info.strengths.map((s) => (
                      <span key={s} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Notable fact */}
                {info.notableFor && (
                  <div className="rounded-xl bg-muted/40 border p-4">
                    <p className="text-xs text-muted-foreground italic">💡 {info.notableFor}</p>
                  </div>
                )}

                {/* CTA */}
                <Button asChild className="w-full" size="lg">
                  <a href={info.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Official Website
                    <ExternalLink className="w-3.5 h-3.5 ml-2" />
                  </a>
                </Button>
              </div>
            ) : (
              <div className="mt-6 space-y-4 text-center">
                <GraduationCap className="w-12 h-12 text-muted-foreground/40 mx-auto" />
                <p className="text-sm text-muted-foreground">Detailed info for this university is not yet available.</p>
                <Button asChild variant="outline" className="w-full">
                  <a href={`https://www.topuniversities.com/universities?search=${encodeURIComponent(universityName)}`} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" />
                    Search on QS Rankings
                    <ExternalLink className="w-3.5 h-3.5 ml-2" />
                  </a>
                </Button>
              </div>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

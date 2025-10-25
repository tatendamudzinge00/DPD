import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRiskAssessments, useSecurityPolicies, useTrainingRecords } from "@/hooks/useEnterpriseData";
import { AlertTriangle, FileText, GraduationCap, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export function RiskGovernanceDashboard() {
  const { data: risks, isLoading: risksLoading } = useRiskAssessments();
  const { data: policies, isLoading: policiesLoading } = useSecurityPolicies();
  const { data: training, isLoading: trainingLoading } = useTrainingRecords();

  const highRisks = risks?.filter(r => Number(r.risk_score) >= 7).length || 0;
  const mediumRisks = risks?.filter(r => Number(r.risk_score) >= 4 && Number(r.risk_score) < 7).length || 0;
  const lowRisks = risks?.filter(r => Number(r.risk_score) < 4).length || 0;
  
  const activePolicies = policies?.filter(p => p.status === 'active').length || 0;
  const expiredPolicies = policies?.filter(p => new Date(p.review_date) < new Date()).length || 0;
  
  const completedTraining = training?.filter(t => t.passed).length || 0;
  const trainingCompletionRate = training?.length ? (completedTraining / training.length) * 100 : 0;

  const getRiskColor = (score: number) => {
    if (score >= 7) return 'destructive';
    if (score >= 4) return 'secondary';
    return 'outline';
  };

  if (risksLoading || policiesLoading || trainingLoading) {
    return <div className="text-muted-foreground">Loading governance data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Risk & Governance</h2>
        <p className="text-muted-foreground">Risk assessment, policy management, and training tracking</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{highRisks}</div>
            <p className="text-xs text-muted-foreground">Risk score ≥ 7</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePolicies}</div>
            <p className="text-xs text-muted-foreground">{expiredPolicies} need review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Completion</CardTitle>
            <GraduationCap className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{trainingCompletionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">{completedTraining} completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Risks</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{risks?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="risks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="risks">Risk Assessments</TabsTrigger>
          <TabsTrigger value="policies">Security Policies</TabsTrigger>
          <TabsTrigger value="training">Training & Awareness</TabsTrigger>
        </TabsList>

        <TabsContent value="risks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment Register</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {risks?.map((risk) => {
                  const riskScore = Number(risk.risk_score);
                  return (
                    <div key={risk.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <div className="font-medium">{risk.risk_name}</div>
                          <div className="text-sm text-muted-foreground">{risk.risk_category}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">Risk Score</div>
                            <div className="text-2xl font-bold">{riskScore.toFixed(1)}</div>
                          </div>
                          <Badge variant={getRiskColor(riskScore)}>
                            {riskScore >= 7 ? 'High' : riskScore >= 4 ? 'Medium' : 'Low'}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-xs text-muted-foreground">Likelihood</div>
                          <div className="font-medium">{Number(risk.likelihood_score).toFixed(1)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Impact</div>
                          <div className="font-medium">{Number(risk.impact_score).toFixed(1)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Residual</div>
                          <div className="font-medium">{risk.residual_risk ? Number(risk.residual_risk).toFixed(1) : 'N/A'}</div>
                        </div>
                      </div>
                      {risk.mitigation_strategy && (
                        <div className="mt-3 text-sm text-muted-foreground">
                          Mitigation: {risk.mitigation_strategy}
                        </div>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="outline">{risk.status}</Badge>
                        <span className="text-xs text-muted-foreground">Owner: {risk.owner}</span>
                      </div>
                    </div>
                  );
                })}
                {(!risks || risks.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    No risk assessments recorded
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Policy Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {policies?.map((policy) => {
                  const reviewDate = new Date(policy.review_date);
                  const isExpired = reviewDate < new Date();
                  
                  return (
                    <div key={policy.id} className={`p-4 border rounded-lg ${isExpired ? 'border-yellow-500 bg-yellow-500/5' : ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          <div className="font-medium">{policy.policy_name}</div>
                          <div className="text-sm text-muted-foreground">{policy.policy_type} | v{policy.version}</div>
                        </div>
                        <Badge variant={policy.status === 'active' ? 'default' : 'secondary'}>
                          {policy.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                        <div>
                          <div className="text-xs text-muted-foreground">Effective Date</div>
                          <div>{new Date(policy.effective_date).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Review Date</div>
                          <div className={isExpired ? 'text-yellow-500 font-medium' : ''}>
                            {reviewDate.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      {policy.acknowledgment_required && (
                        <div className="mt-3 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Acknowledgments</span>
                            <span className="font-medium">{policy.acknowledgment_count}</span>
                          </div>
                        </div>
                      )}
                      <div className="mt-2 text-xs text-muted-foreground">
                        Owner: {policy.owner}
                      </div>
                    </div>
                  );
                })}
                {(!policies || policies.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    No security policies available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-2xl font-bold">{trainingCompletionRate.toFixed(1)}%</span>
                </div>
                <Progress value={trainingCompletionRate} className="h-3" />
                <div className="text-sm text-muted-foreground">
                  {completedTraining} of {training?.length || 0} training sessions completed
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Training Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {training?.slice(0, 15).map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{record.training_name}</div>
                      <div className="text-sm text-muted-foreground">{record.training_type}</div>
                      {record.completion_date && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Completed: {new Date(record.completion_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {record.score && (
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Score</div>
                          <div className="text-lg font-bold">{Number(record.score).toFixed(0)}%</div>
                        </div>
                      )}
                      <Badge variant={record.passed ? 'default' : 'secondary'}>
                        {record.passed ? 'Passed' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                ))}
                {(!training || training.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    No training records available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

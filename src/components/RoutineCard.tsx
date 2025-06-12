
import React from 'react';
import { Clock, Star, Share2, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { RoutineRecommendation } from '@/services/recommendationEngine';
import { socialSharingService } from '@/services/socialSharingService';
import { useToast } from '@/hooks/use-toast';

interface RoutineCardProps {
  routine: RoutineRecommendation;
  onSaveRoutine?: (routineId: string) => void;
}

const RoutineCard: React.FC<RoutineCardProps> = ({ routine, onSaveRoutine }) => {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareableRoutine = socialSharingService.createShareableRoutine(routine);
    const success = await socialSharingService.shareContent(shareableRoutine, {
      platform: 'copy'
    });

    if (success) {
      toast({
        title: "Routine shared! 📋",
        description: "Routine details copied to clipboard",
        duration: 3000,
      });
    }
  };

  const handleSave = () => {
    onSaveRoutine?.(routine.id);
    toast({
      title: "Routine saved! 💾",
      description: `${routine.name} added to your collection`,
      duration: 3000,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTimeOfDayIcon = (timeOfDay: string) => {
    switch (timeOfDay) {
      case 'morning': return '🌅';
      case 'evening': return '🌙';
      case 'weekly': return '📅';
      default: return '⏰';
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              {getTimeOfDayIcon(routine.timeOfDay)}
              {routine.name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getDifficultyColor(routine.difficulty)}>
                {routine.difficulty}
              </Badge>
              <Badge 
                variant="secondary" 
                className="bg-primary/10 text-primary"
              >
                {Math.round(routine.matchScore)}% match
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {routine.duration}
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {routine.steps.length} steps
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-sm mb-2">Routine Steps:</h4>
          <div className="space-y-2">
            {routine.steps.slice(0, 3).map(step => (
              <div key={step.order} className="flex items-start gap-2 text-sm">
                <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                  {step.order}
                </div>
                <div>
                  <span className="font-medium">{step.product}</span>
                  <p className="text-muted-foreground text-xs">{step.instruction}</p>
                </div>
              </div>
            ))}
            {routine.steps.length > 3 && (
              <p className="text-xs text-muted-foreground ml-7">
                +{routine.steps.length - 3} more steps...
              </p>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-2">Benefits:</h4>
          <div className="flex flex-wrap gap-1">
            {routine.benefits.map(benefit => (
              <Badge key={benefit} variant="outline" className="text-xs">
                {benefit}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sm mb-2">Best for:</h4>
          <p className="text-sm text-muted-foreground">
            {routine.suitableFor.join(', ')} skin
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button onClick={handleSave} className="flex-1">
          <CheckCircle className="h-4 w-4 mr-2" />
          Save Routine
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoutineCard;

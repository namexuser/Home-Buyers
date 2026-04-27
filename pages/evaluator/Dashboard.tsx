import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedEvals = JSON.parse(localStorage.getItem('savedEvaluations') || '[]');
      storedEvals.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setEvaluations(storedEvals);
    } catch (error) {
      console.error("Error fetching local evaluations:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading evaluations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Evaluations</h2>
        <Link 
          to="/evaluator/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-blue-700 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          New
        </Link>
      </div>

      {evaluations.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No evaluations yet</h3>
          <p className="text-gray-500 mb-6">Start by creating your first property evaluation.</p>
          <Link 
            to="/evaluator/new" 
            className="inline-flex bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Create Evaluation
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {evaluations.map((evaluation) => (
            <Link 
              key={evaluation.id} 
              to={`/evaluator/edit/${evaluation.id}`}
              className="block bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-blue-300 transition flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {evaluation.propertyId?.address || 'Untitled Property'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(evaluation.createdAt).toLocaleDateString()} • {evaluation.propertyId?.subdivision || 'No subdivision'}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
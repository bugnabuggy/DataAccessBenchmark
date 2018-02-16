using System;
using System.Collections.Generic;
using System.Linq;
using System.Management;
using System.Threading.Tasks;

namespace benchmark.Functional.Services
{
    public class ServerFeatures:IServerFeatures
    {
      public string GetCPUName()
      {
       var name =GetServerFeature("Win32_Processor");
      var result = name["Name"].ToString();
      return result;

      }

      public double GetRAMCount()
      {
        var item =GetServerFeature("Win32_OperatingSystem");
        var number = Convert.ToDouble(item["TotalVisibleMemorySize"].ToString());
        var result = Math.Round((number / (1024 * 1024)), 2); ;
        return result;
      }

      public string GetHDDTypeAndModel()
      {
        var count =GetServerFeature("Win32_DiskDrive");
        var result = count["InterfaceType"].ToString()+":"+ count["Model"].ToString();
      return result;
      }

      public Dictionary<string, object> GetServerFeature(string objectName)
      {
        ManagementClass myManagementClass = new ManagementClass(objectName);
        ManagementObjectCollection myManagementCollection = myManagementClass.GetInstances();

        PropertyDataCollection myProperties = myManagementClass.Properties;
        Dictionary<string, object> myPropertyResults = new Dictionary<string, object>();
        foreach (var obj in myManagementCollection)
        {
          foreach (var myProperty in myProperties)
          {
            myPropertyResults.Add(myProperty.Name,
              obj.Properties[myProperty.Name].Value);
          }
        }
        return myPropertyResults;

      }
    }
}

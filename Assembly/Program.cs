using System;
using System.Linq;
using System.Reflection;

namespace AssemblyVersion
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {

                string filename = args[0];
                AssemblyName assembly = AssemblyName.GetAssemblyName(filename);
                Console.Write(assembly.Version.ToString().Trim());
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }
        }
    }
}

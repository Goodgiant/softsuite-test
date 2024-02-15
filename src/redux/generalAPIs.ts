import axios from "axios";


export const api = axios.create({
    baseURL: "https://650af6bedfd73d1fab094cf7.mockapi.io"
});

export const getElementLookups = async () => {

    try {
        const { data: elementCategories } = await api.get("lookups/1/lookupvalues");
        const { data: elementClassifications } = await api.get("lookups/2/lookupvalues");
        const { data: payRuns } = await api.get("lookups/5/lookupvalues");
        
        return {
            elementCategories,
            elementClassifications,
            payRuns,
        };
    } catch (err) {
        console.log({err})
    }
    
}

const delay = 2;

export const getJobTitles = async () => {
    const res = ():any => {
        return new Promise((resolve, _) => {
            setTimeout(async () => {
                const { data } = await api.get("lookups/6/lookupvalues");
                
                resolve(data)
            }, delay * 100);
        });
    }

    return await res();
}

export const getLocations = async () => {
    const res = ():any => {
        return new Promise((resolve, _) => {
            setTimeout(async () => {
                const { data } = await api.get("lookups/7/lookupvalues");
                
                resolve(data)
            }, delay * 200);
        });
    }

    return await res();
}

export const getCategories = async () => {
    const res = ():any => {
        return new Promise((resolve, _) => {
            setTimeout(async () => {
                const { data } = await api.get("lookups/3/lookupvalues");
                
                resolve(data)
            }, delay * 300);
        });
    }

    return await res();
}

export const getTypes = async () => {
    const res = ():any => {
        return new Promise((resolve, _) => {
            setTimeout(async () => {
                const { data } = await api.get("lookups/4/lookupvalues");
                
                resolve(data)
            }, delay * 500);
        });
    }

    return await res();
}

export const getUnions = async () => {
    const res = ():any => {
        return new Promise((resolve, _) => {
            setTimeout(async () => {
                const { data } = await api.get("lookups/8/lookupvalues");
                
                resolve(data)
            }, delay * 1000);
        });
    }

    return await res();
}

export const getHousings = async () => {
    const res = ():any => {
        return new Promise((resolve, _) => {
            setTimeout(async () => {
                const { data } = await api.get("lookups/9/lookupvalues");
                
                resolve(data)
            }, delay * 70);
        });
    }

    return await res();
}

export const getWardrobes = async () => {
    const res = ():any => {
        return new Promise((resolve, _) => {
            setTimeout(async () => {
                const { data } = await api.get("lookups/10/lookupvalues");
                
                resolve(data)
            }, delay * 50);
        });
    }

    return await res();
}

export const getSecurities = async () => {
    const res = ():any => {
        return new Promise((resolve, _) => {
            setTimeout(async () => {
                const { data } = await api.get("lookups/11/lookupvalues");
                
                resolve(data)
            }, delay * 10);
        });
    }

    return await res();
}



// export const getElementLinkLookups = async () => {

//     try {
        
//         const jobTitleRes = ():any => {
//             return new Promise((resolve, _) => {
//                 setTimeout(async () => {
//                     const { data } = await api.get("lookups/6/lookupvalues");
                    
//                     resolve(data)
//                 }, delay * 3000);
//             });
//         }

//         const locationRes = ():any => {
//             return new Promise((resolve, _) => {
//                 setTimeout(async () => {
//                     const { data } = await api.get("lookups/7/lookupvalues");
                    
//                     resolve(data)
//                 }, delay * 4000);
//             });
//         }

//         const categoryRes = ():any => {
//             return new Promise((resolve, _) => {
//                 setTimeout(async () => {
//                     const { data } = await api.get("lookups/3/lookupvalues");
                    
//                     resolve(data)
//                 }, delay * 5000);
//             });
//         }

//         const typeRes = ():any => {
//             return new Promise((resolve, _) => {
//                 setTimeout(async () => {
//                     const { data } = await api.get("lookups/4/lookupvalues");
                    
//                     resolve(data)
//                 }, delay * 6000);
//             });
//         }

//         const unionRes = ():any => {
//             return new Promise((resolve, _) => {
//                 setTimeout(async () => {
//                     const { data } = await api.get("lookups/8/lookupvalues");
                    
//                     resolve(data)
//                 }, delay * 4000);
//             });
//         }


//         // let endpoints = [
//         //     "https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/6/lookupvalues",
//         //     "https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/7/lookupvalues",
//         //     "https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/3/lookupvalues",
//         //     "https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/4/lookupvalues",
//         //     "https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/8/lookupvalues",
//         // ]

//         // await axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
//         //     axios.spread(({data: jobTitles}, {data:locations}, {data:employeeCategories}, {data:employeeTypes}, {data:unions}) => {
//         //       console.log({ jobTitles, locations, employeeCategories, employeeTypes, unions });
//         //         return { jobTitles, locations, employeeCategories, employeeTypes, unions }
              
//         //     })
//         // );


//         const [jobTitles, employeeCategories, employeeTypes, locations, unions] = [
//             await jobTitleRes(), 
//             await locationRes(),
//             await categoryRes(),
//             await typeRes(),
//             await unionRes(),
//         ]
//         return {
//             employeeCategories,
//             employeeTypes,
//             jobTitles,
//             locations,
//             unions,
//         };
//     } catch (err) {
//         console.log({err})
//     }
    
// }

export const getElementLinkAdditionalLookups = async () => {

    try {
        const { data: housings } = await api.get("lookups/9/lookupvalues");
        const { data: wardrobes } = await api.get("lookups/10/lookupvalues");
        const { data: securities } = await api.get("lookups/11/lookupvalues");
        
        return {
            housings,
            wardrobes,
            securities,
        };
    } catch (err) {
        console.log({err})
    }
    
}

export const getSuborganizations = async () => {

    try {
        const subOrg = ():any => {
            return new Promise((resolve, _) => {
                setTimeout(async () => {
                    const { data: suborganizations } = await api.get("suborganizations");
                    
                    resolve(suborganizations)
                }, delay * 1000);
            });
        }

        const result = await subOrg();
        return result;
       
    } catch (err) {
        console.log({err})
    }
    
}

export const getDepartments = async (suborganizationID: string) => {

    try {
        const { data: departments } = await api.get(`suborganizations/${suborganizationID}/departments`);
        
        return departments;
    } catch (err) {
        console.log({err})
    }
    
}

export const getGrades = async () => {

    try {
        const grades = ():any => {
            return new Promise((resolve, _) => {
                setTimeout(async () => {
                    const { data: grades } = await api.get("grade");
                    
                    resolve(grades)
                }, delay * 2000);
            });
        }

        const result = await grades();
        return result;

    } catch (err) {
        console.log({err})
    }
    
}

export const getGradeSteps = async (gradeID: string) => {

    try {
        const { data: grades } = await api.get(`grade/${gradeID}/gradesteps`);
        
        return grades.data;
    } catch (err) {
        console.log({err})
    }
    
}

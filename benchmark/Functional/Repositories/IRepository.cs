﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace benchmark.Functional.Repositories
{
    public interface IRepository<T>
    {
        IQueryable<T> Data { get; }
        
        T Update(T item);
        T Add(T item);
        T Delete(T item);

        IEnumerable<T> GetAll();

        IEnumerable<T> Get( Expression<Func<T, bool>> filter,
                            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy,
                            string includeProperties);
        IEnumerable<T> Add(IEnumerable<T> items);
        IEnumerable<T> Update(IEnumerable<T> items);
        int Delete();
    }
}

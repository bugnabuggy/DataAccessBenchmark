using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using benchmark.Functional.DataContext;
using Microsoft.EntityFrameworkCore;


namespace benchmark.Functional.Repositories
{
    public class DbRepository<T> : IRepository<T> where T : class
    {
        private BenchmarkDataContext _ctx;
        private DbSet<T> _table;
        public IQueryable<T> Data { get; }

        public DbRepository(BenchmarkDataContext ctx)
        {
            _ctx = ctx;
            _table = _ctx.Set<T>();
            Data = _table;
        }

        public T Update(T entity)
        {
            _table.Update(entity);
            _ctx.SaveChanges();
            return entity;
        }

        public T Add(T entity)
        {
            _table.Add(entity);
            _ctx.SaveChanges();
            return entity;
        }

        public T Delete(T entity)
        {
            _table.Remove(entity);
            _ctx.SaveChanges();
            return entity;
        }

        public IEnumerable<T> GetAll()
        {
            return _table.ToList();
        }

        public IEnumerable<T> Get(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<T> query = this.Data;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }

        public IEnumerable<T> Add(IEnumerable<T> items)
        {
            _table.AddRange(items);
            _ctx.SaveChanges();
            return items;
        }

        public IEnumerable<T> Update(IEnumerable<T> items)
        {
            _table.UpdateRange(items);
            _ctx.SaveChanges();
            return items;
        }

        public int Delete()
        {
            var count =_table.Count();
            _table.RemoveRange(_table);
            _ctx.SaveChanges();
            return count;
        }
    }
}
